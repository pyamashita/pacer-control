import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const roleOptions = [
    { value: "proctor", label: "競技委員" },
    { value: "assistant", label: "補佐員" },
  ];
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              必要情報を入力してください。
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-5">
                {/* <!-- User ID --> */}
                <div>
                  <Label>
                    ID<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="userid"
                    name="userid"
                    placeholder="user_id"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="password"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Role --> */}
                <div>
                  <Label>
                    Role<span className="text-error-500">*</span>
                  </Label>
                  <Select
                    options={roleOptions}
                    placeholder="役割を選択してください"
                    onChange={(value) => setSelectedRole(value)}
                    className="dark:bg-gray-900"
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    管理者は大会の設定、ユーザー管理、成績管理が可能です。一般ユーザーは成績の閲覧のみ可能です。
                  </p>

                </div>
                {/* <!-- Comment --> */}
                <div>
                  <Label>
                    Comment
                  </Label>
                  <TextArea
                    placeholder="申請コメント（任意）"
                    rows={3}
                  />
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                アカウントをお持ちの方は {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
