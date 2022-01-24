import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeMyBagCnt,
  changeMyBagState,
} from "../../../Store/Actions/productAction";
import BuyModalPresenter from "./BuyModalPresenter";
import { PURCHASE_OPTION } from "../../Util/Constant";

const BuyModalContainer = ({
  isOpenModal,
  setIsOpenModal,
  selectedId,
  buyProductName,
  wishList,
  purchasedList,
  setNextList,
}) => {
  const [productName, setProductName] = useState("");
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();

  const handleCancelClick = useCallback(
    (event) => {
      event.preventDefault();
      setIsOpenModal(false);
    },
    [setIsOpenModal]
  );

  const handleUpClick = useCallback((event) => {
    event.preventDefault();
    setNumber((v) => v + 1);
  }, []);

  const handleDownClick = useCallback(
    (event) => {
      event.preventDefault();
      if (number === 0) return;
      setNumber((v) => v - 1);
    },
    [number]
  );

  const handleConfirmClick = useCallback(async () => {
    const cntBody = {
      count: number,
    };
    const changeCntRes = await dispatch(changeMyBagCnt(selectedId, cntBody));
    if (changeCntRes.payload.status === 200) {
      const stateBody = {
        status: PURCHASE_OPTION.AFTER_PURCHASE,
      };
      const res = await dispatch(changeMyBagState(selectedId, stateBody));
      /**
       * TODO
       * React Toastify 적용
       */
      if (res.payload.status === 200) {
        const nextList = [...wishList, ...purchasedList];
        setNextList(nextList, parseInt(selectedId));
        alert("구매가 완료되었습니다.");
      }
    }
    setIsOpenModal(false);
  }, [
    dispatch,
    number,
    purchasedList,
    selectedId,
    setIsOpenModal,
    setNextList,
    wishList,
  ]);

  useEffect(() => {
    setProductName(buyProductName);
  }, [buyProductName]);

  return (
    <BuyModalPresenter
      isOpenModal={isOpenModal}
      handleCancelClick={handleCancelClick}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleConfirmClick={handleConfirmClick}
      number={number}
      productName={productName}
    />
  );
};

export default BuyModalContainer;