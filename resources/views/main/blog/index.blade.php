@extends('main.blog.layout')

@section('content')
    <div class="main-content">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    @if (!$posts->isEmpty())
                    @foreach ($posts as $post)
                        <article class="post">
                            <div class="post-thumb" style="border: 35px solid white">
                                <a href="{{route('post.show', $post->slug)}}"><img src="{{$post->getImage()}}"
                                                                                   style="object-fit: scale-down;"
                                                                                   alt="{{$post->slug}}"></a>

                                <a href="{{route('post.show', $post->slug)}}" class="post-thumb-overlay text-center">
                                    <div class="text-uppercase text-center">Смотреть</div>
                                </a>
                            </div>
                            <div class="post-content">
                                <header class="entry-header text-center text-uppercase">
                                    @if($post->hasCategory())
                                        <h6>
                                            <a href="{{route('category.show', $post->category->slug)}}"> {{$post->getCategoryTitle()}}</a>
                                        </h6>
                                    @else
                                        <span>Без категории</span>
                                    @endif
                                    <h1 class="entry-title"><a
                                            href="{{route('post.show', $post->slug)}}">{{$post->title}}</a></h1>
                                </header>
                                <div class="entry-content">
                                    {!!$post->description!!}

                                    <div class="btn-continue-reading text-center text-uppercase">
                                        <a href="{{route('post.show', $post->slug)}}" class="more-link">Читать далее</a>
                                    </div>
                                </div>
                                <div class="social-share">
                                    <span class="pull-left">Автор: <a href="#">{{$post->author->login}}</a> | {{Date::parse($post->created_at)->format('d F Y г. | H:i')}}</span>
                                    <span class="pull-right">Комментариев к посту: {{ count($post->getComments()) }}</span>
                                </div>
                                <div class="social-share">
                                    <div class="row">
                                        <ul class="text-center">
                                            <li><a class="s-vk" href="#"><i class="fa fa-vk"></i></a></li>
                                            <li><a class="s-instagram" href="#"><i class="fa fa-instagram"></i></a></li>
                                            <li><a class="s-youtube" href="#"><i class="fa fa-youtube-play"></i></a></li>
                                            <li><a class="s-twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </article>
                    @endforeach
                    <div class="text-center">
                        {{$posts->links()}}
                    </div>
                    @else
                        <article class="post post-grid">
                            <div class="post-thumb" style="border: 25px solid white;">
                                <p>Записей пока нет...</p>
                            </div>
                        </article>
                    @endif
                </div>
                @include('main.blog._sidebar', ['posts' => $posts])
            </div>
        </div>
    </div>
@endsection
