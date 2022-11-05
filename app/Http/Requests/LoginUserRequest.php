<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginUserRequest extends FormRequest
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
            'email' => 'required|email:rfc|exists:users,email',
            'password' => 'required',
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
            'email.required' => "поле :attribute является обязательным",
            'email.email' => "поле :attribute не соответствует маске",
            'email.exists' => "комбинация логин/пароль не найдена в базе данных",

            'password.required' => "поле :attribute является обязательным",
        ];
    }
}
