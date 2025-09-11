package com.krane.fakeit.controller;

import com.krane.fakeit.impl.CatchAllServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CatchAllController {

    @Autowired
    private CatchAllServiceImpl catchAllService;

    @RequestMapping(value = "/**",
    method = {
            RequestMethod.PUT,
            RequestMethod.GET,
            RequestMethod.DELETE,
            RequestMethod.POST,
            RequestMethod.OPTIONS
    })
    public ResponseEntity<?> catchAll(HttpServletRequest servletRequest,
                                      @RequestBody(required = false) String body) {
        return catchAllService.catchAll(servletRequest, body);
    }
}
