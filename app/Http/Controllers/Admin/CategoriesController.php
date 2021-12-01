<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return view('admin.categories.index', ['categories' => $categories]);
    }

    public function create()
    {
        return view('admin.categories.create')->with('status', 'Категория успешно создана!');
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $this->validate($request, [
            'title' => 'required'
        ]);

        Category::create($request->all());

        return redirect()->route('categories.index')->with('status', 'Категория успешно создана!');
    }

    public function edit($id)
    {
        $category = Category::find($id);
        return view('admin.categories.edit', ['category'=>$category])->with('status', 'Категория успешно изменена!');
    }

    /**
     * @throws ValidationException
     */
    public function update(Request $request, $id): RedirectResponse
    {
        $this->validate($request, [
            'title' => 'required'
        ]);

        $category = Category::find($id);

        $category->update($request->all());

        return redirect()->route('categories.index')->with('status', 'Категория успешно изменена!');
    }

    public function destroy($id)
    {
        Category::find($id)->delete();
        return redirect()->route('categories.index')->with('status', 'Категория успешно удалена!');
    }
}
