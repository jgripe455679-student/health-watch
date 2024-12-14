import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { post, put } from "../api/apiClient";
import { useAuth } from "../hooks/useAuth";
import { Profile } from "../pages/Profiling";

type ProfileProps = {
  setCurrentProfilingView: (view: string) => void;
  setSuccessMessage: (message: string) => void;
  isEditing: boolean;
  profileDetails: Profile | null;
  setProfileDetails: (profile: Profile | null) => void;
  setIsEditing: (state: boolean) => void;
};

interface ProfileFormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  address: string;
  mobileNumber: string;
  occupation: string;
  educationalBackground: string;
  householdSize: number | null;
  incomeBracket: string;
}

const getEmptyProfileFormValues = (): ProfileFormValues => {
  return {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    address: "",
    mobileNumber: "",
    occupation: "",
    educationalBackground: "",
    householdSize: null,
    incomeBracket: "",
  };
};

const ProfileForm: React.FC<ProfileProps> = ({
  setCurrentProfilingView,
  setSuccessMessage,
  isEditing,
  profileDetails,
  setProfileDetails,
  setIsEditing,
}) => {
  const [values, setValues] = useState<ProfileFormValues>({
    firstName: profileDetails?.firstName || "",
    middleName: profileDetails?.middleName || "",
    lastName: profileDetails?.lastName || "",
    suffix: profileDetails?.suffix || "",
    dateOfBirth: profileDetails?.dateOfBirth || "",
    gender: profileDetails?.gender || "",
    maritalStatus: profileDetails?.maritalStatus || "",
    address: profileDetails?.address || "",
    mobileNumber: profileDetails?.mobileNumber || "",
    occupation: profileDetails?.occupation || "",
    educationalBackground: profileDetails?.educationalBackground || "",
    householdSize: profileDetails?.householdSize || null,
    incomeBracket: profileDetails?.incomeBracket || "",
  });
  const [errors, setErrors] = useState<ProfileFormValues>(
    getEmptyProfileFormValues()
  );
  const [globalError, setGlobalError] = useState<string>("");
  const { username } = useAuth();

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
    if (globalError) setGlobalError("");
  };

  const resetProfileFormValues = (values: ProfileFormValues): void => {
    setValues(values);
  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validation() && !isEditing) {
      try {
        const response = await post("/profiles", {
          ...values,
          createdBy: username,
        });
        if (response.status === 201) {
          setSuccessMessage("Profile created successfully.");
          resetProfileFormValues(getEmptyProfileFormValues());
          setCurrentProfilingView("profiling");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setGlobalError(
            "Oops, something went wrong. Please contact your system administrator."
          );
          resetProfileFormValues(getEmptyProfileFormValues());
        }
        console.error("Error submitting data: ", error);
      }
    } else if (validation() && isEditing && profileDetails !== null) {
      try {
        const response = await put("/profiles/" + profileDetails.id, {
          ...values,
          updatedBy: username,
        });
        if (response.status === 200) {
          setSuccessMessage("Profile updated successfully.");
          resetProfileFormValues(getEmptyProfileFormValues());
          setCurrentProfilingView("profiling");
          setProfileDetails(null);
          setIsEditing(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setGlobalError(
            "Oops, something went wrong. Please contact your system administrator."
          );
          resetProfileFormValues(getEmptyProfileFormValues());
        }
        console.error("Error submitting data: ", error);
      }
    }
  };

  const isMobileNumberValid = (mobileNumber: string): boolean => {
    if (/^\d{0,11}$/.test(mobileNumber)) {
      return true;
    } else {
      return false;
    }
  };

  const validation = (): boolean => {
    let isValid = true;
    const newErrors: ProfileFormValues = getEmptyProfileFormValues();

    if (!values.lastName) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!values.firstName) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!values.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
      isValid = false;
    }

    if (!values.gender) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }

    if (!values.maritalStatus) {
      newErrors.maritalStatus = "Civil status is required.";
      isValid = false;
    }

    if (!values.address) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    if (!values.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
      isValid = false;
    }

    if (values.mobileNumber && !isMobileNumberValid(values.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="flex flex-col items-center w-full">
      {globalError && (
        <div role="alert" className="alert alert-error rounded-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm">{globalError}</span>
        </div>
      )}
      <form className="p-4 w-full max-w-96" onSubmit={handleOnSubmit}>
        <div className="flex items-center">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={
                errors.lastName
                  ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
              }
              value={values.lastName}
              onChange={handleOnChange}
              autoFocus
            />
            {errors.lastName && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.lastName}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-20 ml-4">
            <div className="label">
              <span className="label-text">Suffix</span>
            </div>
            <select
              id="suffix"
              name="suffix"
              className="input input-sm input-bordered rounded-none w-full px-3"
              value={values.suffix}
              onChange={handleOnChange}
            >
              <option value="">Select suffix</option>
              <option value="">None</option>
              <option value="jr.">Jr.</option>
              <option value="sr.">Sr.</option>
              <option value="ii">II</option>
              <option value="iii">III</option>
              <option value="iv">IV</option>
              <option value="v">V</option>
            </select>
          </label>
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className={
              errors.firstName
                ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
            }
            value={values.firstName}
            onChange={handleOnChange}
          />
          {errors.firstName && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.firstName}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Middle Name</span>
          </div>
          <input
            id="middleName"
            name="middleName"
            type="text"
            className="input input-sm input-bordered rounded-none w-full py-1.5 px-3"
            value={values.middleName}
            onChange={handleOnChange}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Date of Birth</span>
          </div>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            className={
              errors.dateOfBirth
                ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
            }
            value={values.dateOfBirth}
            onChange={handleOnChange}
          />
          {errors.dateOfBirth && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.dateOfBirth}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Gender</span>
          </div>
          <select
            id="gender"
            name="gender"
            className={
              errors.gender
                ? "input input-sm input-bordered input-error rounded-none w-full px-3"
                : "input input-sm input-bordered rounded-none w-full px-3"
            }
            value={values.gender}
            onChange={handleOnChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <div className="label">
              <span className="label-text-alt text-error">{errors.gender}</span>
            </div>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Civil Status</span>
          </div>
          <select
            id="maritalStatus"
            name="maritalStatus"
            className={
              errors.maritalStatus
                ? "input input-sm input-bordered input-error rounded-none w-full px-3"
                : "input input-sm input-bordered rounded-none w-full px-3"
            }
            value={values.maritalStatus}
            onChange={handleOnChange}
          >
            <option value="">Select civil status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
            <option value="separated">Separated</option>
            <option value="domestic partnership">Domestic Partnership</option>
          </select>
          {errors.maritalStatus && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.maritalStatus}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <textarea
            id="address"
            name="address"
            rows={4}
            className={
              errors.address
                ? "textarea textarea-sm textarea-bordered textarea-error rounded-none w-full py-1.5 px-3"
                : "textarea textarea-sm textarea-bordered rounded-none w-full py-1.5 px-3"
            }
            value={values.address}
            onChange={handleOnChange}
          ></textarea>
          {errors.address && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.address}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Mobile Number</span>
            <span className="label-text-alt text-gray-600">
              (e.g. 09123456789)
            </span>
          </div>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="text"
            className={
              errors.mobileNumber
                ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
            }
            value={values.mobileNumber}
            onChange={handleOnChange}
          />
          {errors.mobileNumber && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.mobileNumber}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Occupation (Optional)</span>
          </div>
          <input
            id="occupation"
            name="occupation"
            type="text"
            className="input input-sm input-bordered rounded-none w-full py-1.5 px-3"
            value={values.occupation}
            onChange={handleOnChange}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Highest Level of Education (Optional)
            </span>
          </div>
          <input
            id="educationalBackground"
            name="educationalBackground"
            type="text"
            className="input input-sm input-bordered rounded-none w-full py-1.5 px-3"
            value={values.educationalBackground}
            onChange={handleOnChange}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Household Size (Optional)</span>
          </div>
          <input
            id="householdSize"
            name="householdSize"
            type="number"
            min={0}
            className="input input-sm input-bordered rounded-none w-full py-1.5 px-3"
            value={values.householdSize ?? 0}
            onChange={handleOnChange}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Household Income Bracket (Optional)
            </span>
          </div>
          <select
            id="incomeBracket"
            name="incomeBracket"
            className="input input-sm input-bordered rounded-none w-full px-3"
            value={values.incomeBracket}
            onChange={handleOnChange}
          >
            <option value="">Select household income bracket</option>
            <option value="poor">Below ₱10,957 monthly income</option>
            <option value="low income (but not poor)">
              ₱10,957 to ₱21,914 monthly income
            </option>
            <option value="lower middle class">
              ₱21,914 to ₱43,828 monthly income
            </option>
            <option value="middle class">
              ₱43,828 to ₱76,66 monthly income
            </option>
            <option value="upper middle income">
              ₱76,669 to ₱131,484 monthly income
            </option>
            <option value="high income (but not rich)">
              ₱131,483 to ₱219,140 monthly income
            </option>
            <option value="rich">₱ 219,140 and above monthly income</option>
          </select>
        </label>
        <div className="flex justify-end gap-x-1.5 py-1.5">
          <button
            className="btn btn-ghost btn-sm rounded-none"
            onClick={() => setCurrentProfilingView("profiling")}
          >
            Cancel
          </button>
          <input
            type="submit"
            className="btn btn-sm btn-primary rounded-none"
            value={isEditing ? "Update" : "Add"}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
