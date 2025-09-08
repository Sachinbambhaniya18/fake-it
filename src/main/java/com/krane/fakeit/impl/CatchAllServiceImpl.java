package com.krane.fakeit.impl;

import com.krane.fakeit.service.CatchAllService;
import org.springframework.stereotype.Service;

/**
 * Implementation of the {@link CatchAllService}.
 *
 * <p>This service is intended to power the "catch-all" feature, where
 * any incoming request that does not map to a defined controller
 * (such as <code>/mocks</code>) will be intercepted.</p>
 */
@Service
public class CatchAllServiceImpl implements CatchAllService {
}
