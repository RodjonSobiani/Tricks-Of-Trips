<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;

Route::middleware(['throttle:3,1'])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => 'admin'], function () {
        Route::get('/', 'DashboardController@index');
        Route::resource('/categories', 'CategoriesController');
        Route::resource('/adventures', 'AdventuresController');
        Route::resource('/tags', 'TagsController');
        Route::resource('/users', 'UsersController');
        Route::resource('/posts', 'PostsController');
        Route::get('/comments', 'CommentsController@index');
        Route::get('/comments/toggle/{id}', 'CommentsController@toggle');
        Route::delete('/comments/{id}/destroy', 'CommentsController@destroy')->name('comments.destroy');
        Route::resource('/subscribers', 'SubscribersController');
    });

    Route::group(['prefix' => 'auth', 'namespace' => 'Blog', 'middleware' => 'guest'], function () {
        Route::get('/register', 'AuthController@registerForm');
        Route::post('/register', 'AuthController@register');
        Route::get('/login', 'AuthController@loginForm')->name('login');
        Route::post('/login', 'AuthController@login');
    });

    Route::group(['prefix' => 'auth', 'namespace' => 'Blog', 'middleware' => 'auth'], function () {
        Route::get('/logout', 'AuthController@logout');
    });


    Route::group(['prefix' => 'blog', 'namespace' => 'Blog', 'middleware' => 'auth'], function () {
        Route::get('/profile', 'ProfileController@index');
        Route::post('/profile', 'ProfileController@store');
        Route::post('/comment', 'CommentsController@store');
        Route::resource('/create', 'PostsController');
    });

    Route::group(['prefix' => 'blog', 'namespace' => 'Blog'], function () {
        Route::get('/', 'HomeController@index');
        Route::delete('/comments/{id}/destroy', 'CommentsController@destroy')->name('commentsUser.destroy');
        Route::resource('/posts/create', 'PostsController');
        Route::get('/post/{slug}', 'HomeController@show')->name('post.show');
        Route::get('/profile/{slug}', 'ProfileController@index');
        Route::get('/tag/{slug}', 'HomeController@tag')->name('tag.show');
        Route::get('/category/{slug}', 'HomeController@category')->name('category.show');
        Route::post('/subscribe', 'SubsController@subscribe');
        Route::get('/verify/{token}', 'SubsController@verify');
        Route::get('/search', 'SearchController@index')->name('search');
    });

    Route::get('/404', function () {
        return abort(404);
    });
});
