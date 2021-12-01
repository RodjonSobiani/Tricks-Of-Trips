<?php

namespace App\Providers;

use App\Http\Controllers\Admin\CategoriesController;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\ServiceProvider;
use Jenssegers\Date\Date;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        Date::setlocale(config('app.locale'));

        view()->composer('main.blog._sidebar', function ($view) {
            $view->with('popularPosts', Post::getPopularPosts());
            $view->with('featurePosts', Post::getFeaturePosts());
            $view->with('recentPosts', Post::getRecentPosts());
            $view->with('categories', Category::all());
        });

        view()->composer('main.blog.index', function ($view) {
            $view->with('recentPosts', Post::getRecentPosts());
        });

        view()->composer('admin._sidebar', function($view){
            $view->with('newCommentsCount', Comment::where('status', 0)->count());
        });

        date_default_timezone_set('Asia/Tomsk');
    }

}
