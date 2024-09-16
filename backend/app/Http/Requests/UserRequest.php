<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route()->user;
        $emailRule = 'required|email|unique:users';
        if($id){
            $emailRule .=','.$id;
            $name= $this->name;
            $email= $this->email;
            $password= $this->password;
            $rules=[];
            if($name){
                $rules['name'] = 'required|min:4';
            }
            if($password){
                $rules['password'] = $emailRule;
            }
            if($email){
                $rules['email'] = 'required|min:4';
            }
            return $rules;
        }
        return [
            'name' => 'required|min:4',
            'email'=> $emailRule,
            'password'=> 'required|min:6',

        ];
    }
    public function messages(){
        return [
            'requied'=> ': bắt buộc phải nhập',
            'min' => 'phải từ :min kí tự',
            'email'=> 'phải định dạng email',
            'unique'=> ':attribute đã tồn tại'
        ];
    }
    public function attributes(){
        return [
            'requied'=> ': bắt buộc phải nhập',
            'min' => 'phải từ :min kí tự',
            'email'=> 'phải định dạng email',
        ];
    }
}
