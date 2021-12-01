<?php

namespace App\Http\Middleware;

use http\Exception\RuntimeException;
use Illuminate\Routing\Middleware\ThrottleRequests as Middleware;

class ThrottleRequests extends Middleware
{
    protected function resolveRequestSignature($request)
    {
        if ($user = $request->user()) {
            return sha1($user->getAuthIdentifier());
        }

        if ($route = $request->route()) {
            return sha1(
                implode('|', $route->methods()) // Методы
            . '|' .
                implode('|', [
                    $route->getDomain(),
                    $route->uri(), // Шаблон URL
                    $request->ip(),
                ])
            );
        }

        throw new RuntimeException('Unable to generate the request signature. Route unavailable.');
    }
}
