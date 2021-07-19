package com.modimoa.backend.service;


import com.modimoa.backend.domain.Mybag;

import com.modimoa.backend.domain.User;
import com.modimoa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Transactional
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String signUp(String userImage, String userEmail, Cookie[] oauthCookie) {
        String result = "";

        Optional <User> user = userRepository.findByUserEmail(userEmail);
         if(user.isPresent()){
            result = userEmail+"은 이미 존재합니다.";
        }else{
            user.orElseGet(() ->userRepository.save(new User(userEmail,userImage,oauthCookie[0].getValue(),"new","new")));
            result = userEmail+"로 회원가입 되었습니다.";
        }
        return  result;
    }


    public String login(String token) {
        String result ="";

        Optional <User> user = Optional.of(userRepository.findByOauthToken(token).get());

        if(user.isPresent()){
            String accessToken=token+"access";
            String refreshToken=token+"refresh";
            user.get().updateTokens(accessToken,refreshToken);
            result = user.get().getUserEmail()+"로 로그인 되었습니다."+" access: "+accessToken+" refresh: "+refreshToken;
        }else{
            result = "로그인에 실패하셨습니다.";
        }

        return result;
    }


    // Dao를 통해 모든 물품을 가져와서 반환하는 list형 함수
    public List<User> getAllUsers(){
        return userRepository.findAll();
    };


    public String logout(String token) {
        String result ="";

        Optional <User> user = Optional.of(userRepository.findByOauthToken(token).get());

        if(user.isPresent()){
            String accessToken="";
            String refreshToken="";
            user.get().updateTokens(accessToken,refreshToken);
            result = user.get().getUserEmail()+"이 로그아웃 되었습니다.";
        }else{
            result = "로그아웃에 실패하셨습니다.";
        }

        return result;
    }

    public String withdrawal(String token) {

        User user = userRepository.findByAccessToken(token).get();

        userRepository.deleteByAccessToken(token);

        return "탈퇴에 성공했습니다.";

    }


    public Map getUserInfo(String token) {
        Map result= new HashMap<String,String>();

        User user = userRepository.findByAccessToken(token).get();

        result.put("user_email", user.getUserEmail());
        result.put("user_image", user.getUserImage());


        return result;

    }

}
