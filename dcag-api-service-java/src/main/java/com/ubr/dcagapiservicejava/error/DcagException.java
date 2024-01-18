package com.ubr.dcagapiservicejava.error;

import java.util.Date;

public record DcagException(Date date, String message) {
}
