<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return !auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|min:3|max:32',
            'email' => 'required|email:rfc|unique:users,email',
            'password' => 'required|min:8|max:32|confirmed|regex:/(?=.+[a-z])(?=.+[A-Z])(?=.+\d)/',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            'email' => 'e-mail адрес',
            'name' => 'имя',
            'password' => 'пароль',
        ];
    }

    /**
     * Get custom messages for validation errors.
     *
     * @return string[]
     */
    public function messages(): array
    {
        return [
            'name.required' => "поле :attribute является обязательным",
            'name.min' => "поле :attribute слишком короткое",
            'name.max' => "поле :attribute очень длинное",

            'email.required' => "поле :attribute является обязательным",
            'email.email' => "поле :attribute не соответствует маске",
            'email.unique' => "такой :attribute уже существует",

            'password.required' => "поле :attribute является обязательным",
            'password.min' => "поле :attribute слишком короткое",
            'password.max' => "поле :attribute очень длинное",
            'password.confirmed' => "введеные пароли не совпадают",
            'password.regex' => "необходимо использовать цифры, а так же буквы в разном регистре",
        ];
    }
}
