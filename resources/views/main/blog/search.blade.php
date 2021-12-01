@extends('main.blog.layout')

@section('content')
    <div class="main-content">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="row">
                        @if(count($post) != 0)
                            @foreach($post as $posts)
                                <div class="col-md-6">
                                    <article class="post post-grid">
                                        <div class="post-thumb" style="border: 25px solid white;">
                                            <a style="color: black;" href="{{route('post.show', $posts->slug)}}">
                                                <p><b>{{Str::limit($posts->title, '42')}}</b></p>
                                            </a>
                                            <a href="{{route('post.show', $posts->slug)}}">
                                                <img src="{{$posts->getImage()}}" alt="{{$posts->slug}}"
                                                     style="min-height: 150px; max-height: 150px; object-fit: cover">
                                            </a>
                                            <br/>
                                            <a class="btn btn-info" href="{{route('post.show', $posts->slug)}}">Читать
                                                далее</a>
                                        </div>
                                    </article>
                                </div>
                            @endforeach
                        @else
                            <article class="post post-grid">
                                <div class="post-thumb" style="border: 25px solid white;">
                                    <p>Нет результатов</p>
                                </div>
                            </article>
                        @endif
                    </div>
                    <div class="text-center">
                        {{$post->links()}}
                    </div>
                </div>
                @include('main.blog._sidebar')
            </div>
        </div>
    </div>
@endsection
