<?php

namespace App\Http\Controllers\Blog;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $count = 0;
        $all = Post::all();
        foreach ($all as $alls)
            $count += 1;
        $value = $request->input('q');
        $post = Post::where('title', 'LIKE', '%' . $value . '%')->paginate($count);
        return view('main.blog.search', ['post' => $post]);
    }
}
