@extends('main.blog.layout')

@section('content')

<div class="main-content">
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="row">
                @foreach($posts as $post)
                    <div class="col-md-6">
                        <article class="post post-grid">
                            <div class="post-thumb" style="">
                                <a href="{{route('post.show', $post->slug)}}"><img style="object-fit: cover; min-width: 100%; min-height: 220px" src="{{$post->getImage()}}" alt="{{$post->slug}}"></a>
                                <a href="{{route('post.show', $post->slug)}}" class="post-thumb-overlay text-center">
                                    <div class="text-uppercase text-center">Смотреть</div>
                                </a>
                            </div>
                            <div class="post-content">
                                <header class="entry-header text-center text-uppercase">
                                    @if($post->hasCategory())
                                        <h6><a href="{{route('category.show', $post->category->slug)}}"> {{$post->getCategoryTitle()}}</a></h6>
                                    @else
                                        <span>Без категории</span>
                                    @endif
                                    <h1 class="entry-title"><a href="{{route('post.show', $post->slug)}}">{{$post->title}}</a></h1>
                                </header>
                                <div class="entry-content">
                                    {!! $post->description !!}

                                    <div class="social-share">
                                        <span class="social-share-title pull-left">Автор: {{$post->author->login}} | {{Date::parse($post->created_at)->format('d F Y г. | H:i')}}</span>
                                    </div>
                                </div>
                            </div>

                        </article>
                    </div>
                @endforeach

                </div>
                <div class="text-center">
                    {{$posts->links()}}
                </div>
            </div>
            @include('main.blog._sidebar')
        </div>
    </div>
</div>

@endsection
