<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Test\Constraint\ResponseFormatSame;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users= User::latest()->get();
        return response()->json([
            'success' =>true,
            'data' => $users,
            'message'=>'thành công'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user= new User;
        $user->fill($request->all());
        $user->password= bcrypt($request->password);
        $user->save();
        return response()->json([
            'success' =>true,
            'data' => $user,
            'message'=>'thành công'
        ],201);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user= User::find($id);
        if(!$user){
            return response()->json([
                'success' =>false,
                'message'=>'lỗi'
            ],404
        );
        }
        return response()->json([
            'success' =>true,
            'data' => $user,
            'message'=>'thành công'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        $user = User::find($id);
        if(!$user){
            return response()->json([
                'success' =>false,
                'message'=>'lỗi'
            ],404
        );
        }
        if($request->name){
            $user->name= $request->name;

        }
        if($request->password){
            $user->password= bcrypt($request->password);
            
        }
        if($request->email){
            $user->email= $request->email;
            
        }
        $user->save();
        return response()->json([
            'success' =>true,
            'data' => $user,
            'message'=>'thành công'
        ],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if(!$user){
            return response()->json([
                'success' =>false,
                'message'=>'lỗi'
            ],404);
    }
    $user->delete();
    return response()->json([
        'success' =>true,
        'message'=>'thành công'
    ]);

}
}
