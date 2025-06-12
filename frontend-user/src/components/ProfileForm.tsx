import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { get, put } from "../api/apiClient";
import { useAppUtility } from "../hooks/useAppUtility";
import { useAuth } from "../hooks/useAuth";
import { Profile } from "../pages/Profiling";
import { ProfileFormValues } from "./HealthRecordForm";

type ProfileProps = {
  profileDetails: Profile | null;
  setCurrentView: (view: string) => void;
  resetEditingState: () => void;
  isEditing: boolean;
  setSearchValue: (val: string) => void;
  setSuccessMessage: (message: string) => void;
};

const initalProfileFormValues: ProfileFormValues = {
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

const ProfileForm: React.FC<ProfileProps> = ({
  profileDetails,
  setCurrentView,
  resetEditingState,
  isEditing,
  setSuccessMessage,
  setSearchValue,
}) => {
  const [globalError, setGlobalError] = useState<string>("");
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
    initalProfileFormValues
  );
  const { isMobileNumberValid } = useAppUtility();
  const { username } = useAuth();

  const resetState = (view?: string): void => {
    setValues(initalProfileFormValues);
    resetEditingState();
    if (view) setCurrentView(view);
  };

  const handleGoBackClick = (): void => {
    resetState("profiling");
  };

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "mobileNumber") {
      const mobileNumberPattern = /^(|[0-9]\d{0,10})$/;
      if (mobileNumberPattern.test(value)) {
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: "" });
      }
    }

    setValues({ ...values, [name]: value.toUpperCase() });
    setErrors({ ...errors, [name]: "" });

    if (globalError) setGlobalError("");
  };

  const handleOnSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (validation() && isEditing && profileDetails !== null) {
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
          setSearchValue("");
          setValues(initalProfileFormValues);
          setSuccessMessage("Profile updated successfully.");
          resetState("profiling");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setValues(initalProfileFormValues);
          setGlobalError(
            "Oops, something went wrong. Please contact your system administrator."
          );
        }
        console.error("Error submitting profile data: ", error);
      }
    }
  };

  const validation = (): boolean => {
    let isValid = true;
    const newErrors: ProfileFormValues = { ...initalProfileFormValues };

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
        <div
          role="alert"
          className="alert alert-error rounded-none flex justify-between"
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
            <span className="text-sm">{globalError}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 shrink-0 stroke-current cursor-pointer"
            viewBox="0 0 384 512"
            onClick={() => setGlobalError("")}
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </div>
      )}
      <form
        className="p-2 lg:p-4 flex flex-col w-11/12 lg:w-10/12 max-sm:w-full"
        onSubmit={handleOnSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col max-sm:self-center max-sm:space-y-4 md:flex-row md:space-x-4 w-3/4 md:w-full">
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  First Name
                </span>
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
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
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Middle Name
                </span>
              </div>
              <input
                id="middleName"
                name="middleName"
                type="text"
                className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                value={values.middleName}
                onChange={handleOnChange}
              />
            </label>
            <div className="flex flex-1 space-x-4 items-center">
              <label className="form-control flex-1 w-full">
                <div className="label">
                  <span className="label-text text-sm xl:text-base">
                    Last Name
                  </span>
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                  value={values.lastName}
                  onChange={handleOnChange}
                />
                {errors.lastName && (
                  <div className="label">
                    <span className="label-text-alt text-error">
                      {errors.lastName}
                    </span>
                  </div>
                )}
              </label>
              <label className="form-control flex-none w-16">
                <div className="label">
                  <span className="label-text text-sm xl:text-base">
                    Suffix
                  </span>
                </div>
                <select
                  id="suffix"
                  name="suffix"
                  className="input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
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
          </div>
          <div className="flex flex-col max-sm:self-center max-sm:space-y-4 md:flex-row md:space-x-4 w-3/4 md:w-full">
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Date of Birth
                </span>
              </div>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
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
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">Gender</span>
              </div>
              <select
                id="gender"
                name="gender"
                className="input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
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
                  <span className="label-text-alt text-error">
                    {errors.gender}
                  </span>
                </div>
              )}
            </label>
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Civil Status
                </span>
              </div>
              <select
                id="maritalStatus"
                name="maritalStatus"
                className="input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
                value={values.maritalStatus}
                onChange={handleOnChange}
              >
                <option value="">Select civil status</option>
                <option value="SINGLE">SINGLE</option>
                <option value="MARRIED">MARRIED</option>
                <option value="DIVORCED">DIVORCED</option>
                <option value="WIDOWED">WIDOWED</option>
                <option value="SEPARATED">SEPARATED</option>
                <option value="DOMESTIC PARTNERSHIP">
                  DOMESTIC PARTNERSHIP
                </option>
              </select>
              {errors.maritalStatus && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors.maritalStatus}
                  </span>
                </div>
              )}
            </label>
          </div>
          <div className="flex flex-col max-sm:self-center max-sm:space-y-4 md:flex-row md:space-x-4 w-3/4 md:w-full">
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">Address</span>
              </div>
              <textarea
                id="address"
                name="address"
                rows={1}
                className="textarea textarea-sm lg:textarea-md textarea-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base max-sm:min-h-28 max-lg:min-h-0"
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
            <label className="form-control flex-none w-64 lg:w-96">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Mobile Number
                </span>
                <span className="label-text-alt text-gray-600 text-sm xl:text-base">
                  (e.g. 09123456789)
                </span>
              </div>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
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
          </div>
          <div className="flex flex-col max-sm:self-center max-sm:space-y-4 md:flex-row md:space-x-4 w-3/4 md:w-full">
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Occupation (Optional)
                </span>
              </div>
              <input
                id="occupation"
                name="occupation"
                type="text"
                className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                value={values.occupation}
                onChange={handleOnChange}
              />
            </label>
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Educational Attainment (Optional)
                </span>
              </div>
              <select
                id="educationalBackground"
                name="educationalBackground"
                className="input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
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
                <option value="POSTGRADUATE STUDIES">
                  POSTGRADUATE STUDIES
                </option>
              </select>
            </label>
            <label className="form-control lg:flex-none md:w-44 xl:flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Household Size (Optional)
                </span>
              </div>
              <input
                id="householdSize"
                name="householdSize"
                type="number"
                min={0}
                className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                value={values.householdSize ?? 0}
                onChange={handleOnChange}
              />
            </label>
          </div>
          <div className="flex flex-col max-sm:self-center max-sm:space-y-4 md:flex-row md:space-x-4 w-3/4 md:w-full">
            <label className="form-control flex-none w-64 lg:w-96">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Household Income Bracket (Optional)
                </span>
              </div>
              <select
                id="incomeBracket"
                name="incomeBracket"
                className="input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
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
          </div>
          <div className="flex max-sm:flex-col-reverse justify-end self-center gap-1.5  py-1.5 w-3/4 my-1.5 md:w-full">
            <button
              className="btn btn-ghost btn-sm lg:btn-md rounded-none text-sm lg:text-base"
              onClick={handleGoBackClick}
            >
              Cancel
            </button>
            <input
              type="submit"
              className="btn btn-sm lg:btn-md btn-primary rounded-none text-sm lg:text-base max-sm:w-full"
              value="Update"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
