package org.openvasp.host.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class HttpBadRequestException extends RuntimeException {

    public HttpBadRequestException() {
    }

    public HttpBadRequestException(Throwable cause) {
        super(cause);
    }

    public HttpBadRequestException(String format, Object... args) {
        super(String.format(format, args));
    }

    public HttpBadRequestException(Throwable cause, String format, Object... args) {
        super(String.format(format, args), cause);
    }

}
