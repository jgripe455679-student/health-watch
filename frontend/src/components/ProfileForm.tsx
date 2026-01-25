import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../api/apiClient";
import { useAppUtility } from "../hooks/useAppUtility";
import { useAuth } from "../hooks/useAuth";
import { useProfiling } from "../hooks/useProfiling";
import { Profile } from "../pages/profiling/Profiling";
import getEmptyProfileFormValues, { ProfileFormValues } from "../utils/profile";
import { FormMessageProps } from "../utils/types";

type ProfileProps = {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  profileDetails?: Profile;
};

const ProfileForm: React.FC<ProfileProps> = ({
  isEditing,
  setMessage,
  profileDetails,
}) => {
  const [values, setValues] = useState<ProfileFormValues>({
    firstName: profileDetails?.firstName || "",
    middleName: profileDetails?.middleName || "",
    lastName: profileDetails?.lastName || "",
    suffix: profileDetails?.suffix || "",
    dateOfBirth: profileDetails?.dateOfBirth || "",
    age: profileDetails?.age || null,
    gender: profileDetails?.gender || "",
    maritalStatus: profileDetails?.maritalStatus || "",
    address: profileDetails?.address || "",
    mobileNumber: profileDetails?.mobileNumber || "",
    educationalBackground: profileDetails?.educationalBackground || "",
    occupation: profileDetails?.occupation || "",
  });
  const [errors, setErrors] = useState<ProfileFormValues>(
    getEmptyProfileFormValues(),
  );
  const [formMessage, setFormMessage] = useState<FormMessageProps | null>(null);
  const { username } = useAuth();
  const { isMobileNumberValid } = useAppUtility();
  const navigate = useNavigate();
  const { stopEditing } = useProfiling();

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    if (name === "mobileNumber") {
      const mobileNumberPattern = /^(|[0-9]\d{0,10})$/;
      if (mobileNumberPattern.test(value)) {
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: "" });
      }
    } else {
      setValues({ ...values, [name]: value.toUpperCase() });
      setErrors({ ...errors, [name]: "" });
    }

    if (formMessage) setFormMessage(null);
  };

  const handleOnClose = (): void => {
    if (isEditing) {
      stopEditing();
    }
    navigate(-1);
  };

  const handleOnSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (validation() && !isEditing) {
      try {
        const { lastName, firstName, middleName } = values;
        const response = await post("/profiles", {
          ...values,
          lastName: lastName.trim(),
          firstName: firstName.trim(),
          middleName: middleName.trim(),
          createdBy: username,
        });
        if (response.status === 201) {
          await get("/rabbitmq/profiles/send");
          setSuccessMessage("Profile created successfully.");
          resetState("profiling");
          resetSearchState();
          resetPageNumber();
          fetchAllProfiles();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setValues(getEmptyProfileFormValues());
          setGlobalError(
            "Oops, something went wrong. Please contact your system administrator.",
          );
        }
        console.error("Error submitting profile data: ", error);
      }
    } else if (validation() && isEditing && profileDetails !== null) {
      try {
        const { lastName, firstName, middleName } = values;
        const response = await put("/profiles/" + profileDetails.id, {
          ...values,
          lastName: lastName.trim(),
          firstName: firstName.trim(),
          middleName: middleName.trim(),
          updatedBy: username,
        });
        if (response.status === 200) {
          await get("/rabbitmq/profiles/send");
          setSuccessMessage("Profile updated successfully.");
          resetState("profiling");
          resetSearchState();
          resetPageNumber();
          fetchAllProfiles();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setValues(getEmptyProfileFormValues());
          setGlobalError(
            "Oops, something went wrong. Please contact your system administrator.",
          );
        }
        console.error("Error submitting profile data: ", error);
      }
    }
  };

  const validation = (): boolean => {
    let isValid = true;
    const newErrors: ProfileFormValues = { ...getEmptyProfileFormValues() };

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
      {formMessage && (
        <div
          role="alert"
          className={`alert ${!formMessage.isError ? "alert-success" : "alert-error"} rounded-none flex justify-between`}
        >
          <div className="flex items-center gap-x-1.5">
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
            <span className="text-sm">{formMessage.message}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 shrink-0 stroke-current cursor-pointer"
            viewBox="0 0 384 512"
            onClick={() => setFormMessage(null)}
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
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
              <option value="JR.">JR.</option>
              <option value="SR.">SR.</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
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
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
            <option value="NON-BINARY">NON-BINARY</option>
            <option value="PREFER NOT TO SAY">PREFER NOT TO SAY</option>
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
            <option value="SINGLE">SINGLE</option>
            <option value="MARRIED">MARRIED</option>
            <option value="DIVORCED">DIVORCED</option>
            <option value="WIDOWED">WIDOWED</option>
            <option value="SEPARATED">SEPARATED</option>
            <option value="DOMESTIC PARTNERSHIP">DOMESTIC PARTNERSHIP</option>
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
              Educational Attainment (Optional)
            </span>
          </div>
          <select
            id="educationalBackground"
            name="educationalBackground"
            className="input input-sm input-bordered rounded-none w-full px-3"
            value={values.educationalBackground}
            onChange={handleOnChange}
          >
            <option value="">Select educational attainment</option>
            <option value="NO FORMAL EDUCATION">NO FORMAL EDUCATION</option>
            <option value="SOME ELEMENTARY">SOME ELEMENTARY SCHOOL</option>
            <option value="ELEMENTARY GRADUATE">ELEMENTARY GRADUATE</option>
            <option value="SOME JUNIOR HIGH SCHOOL">
              SOME JUNIOR HIGH SCHOOL
            </option>
            <option value="JUNIOR HIGH SCHOOL GRADUATE">
              JUNIOR HIGH SCHOOL GRADUATE
            </option>
            <option value="SOME SENIOR HIGH SCHOOL">
              SOME SENIOR HIGH SCHOOL
            </option>
            <option value="SENIOR HIGH SCHOOL GRADUATE">
              SENIOR HIGH SCHOOL GRADUATE
            </option>
            <option value="SOME COLLEGE">SOME COLLEGE</option>
            <option value="COLLEGE GRADUATE">COLLEGE GRADUATE</option>
            <option value="POSTGRADUATE STUDIES">POSTGRADUATE STUDIES</option>
          </select>
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
            <option value="POOR">Below ₱10,957 monthly income</option>
            <option value="LOW INCOME (BUT NOT POOR)">
              ₱10,957 to ₱21,914 monthly income
            </option>
            <option value="LOWER MIDDLE CLASS">
              ₱21,914 to ₱43,828 monthly income
            </option>
            <option value="MIDDLE CLASS">
              ₱43,828 to ₱76,66 monthly income
            </option>
            <option value="UPPER MIDDLE INCOME">
              ₱76,669 to ₱131,484 monthly income
            </option>
            <option value="HIGH INCOME (BUT NOT RICH)">
              ₱131,483 to ₱219,140 monthly income
            </option>
            <option value="RICH">₱ 219,140 and above monthly income</option>
          </select>
        </label>
        <div className="flex justify-end gap-x-1.5 py-1.5">
          <button
            className="btn btn-ghost btn-sm rounded-none"
            onClick={handleGoBackClick}
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
