package com.krane.fakeit.mapper;

import com.krane.fakeit.impl.CatchAllServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Mapper component to integrate the catch-all functionality with the service layer.
 *
 */
 public class CatchAllMapper {

    @Autowired
    private CatchAllServiceImpl catchAllService;
}
