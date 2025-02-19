import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { get, post, put } from "../api/apiClient";
import { useAppUtility } from "../hooks/useAppUtility";
import { useAuth } from "../hooks/useAuth";
import { ProfileType } from "../pages/HealthRecord";
import { Profile } from "../pages/Profiling";

type HealthRecordFormProps = {
  profileTypes: ProfileType[];
};

interface Department {
  id: number;
  name: string;
  services: string[];
}

interface HealthRecordFormValues {
  profileType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dateOfBirth: string;
  department: string;
  height: string;
  weight: string;
  bloodPressure: string;
}

const initialHealthRecordFormValues: HealthRecordFormValues = {
  profileType: "",
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  dateOfBirth: "",
  department: "",
  height: "",
  weight: "",
  bloodPressure: "",
};

export interface ProfileFormValues {
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

const HealthRecordForm: React.FC<HealthRecordFormProps> = ({
  profileTypes,
}) => {
  const [globalError, setGlobalError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [healthRecordFormValues, setHealthRecordFormValues] =
    useState<HealthRecordFormValues>(initialHealthRecordFormValues);
  const [profileFormValues, setProfileFormValues] = useState<ProfileFormValues>(
    initalProfileFormValues
  );
  const [healthRecordFormErrors, setHealthRecordFormErrors] =
    useState<HealthRecordFormValues>(initialHealthRecordFormValues);
  const [profileFormErrors, setProfileFormErrors] = useState<ProfileFormValues>(
    initalProfileFormValues
  );
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { username } = useAuth();
  const { isMobileNumberValid } = useAppUtility();

  const fetchAllDepartments = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await get("/departments");
      setDepartments(response.data as Department[]);
    } catch (error) {
      console.error("Error fetching departments data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDepartments();
  }, []);

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    const formPrefix = "form_";
    const profilePrefix = "profile_";

    if (name.startsWith(formPrefix)) {
      if (name.slice(formPrefix.length) === "height") {
        if (/^\d{0,3}$/.test(value)) {
          setHealthRecordFormValues({
            ...healthRecordFormValues,
            [name.slice(formPrefix.length)]: value,
          });
          setHealthRecordFormErrors({
            ...healthRecordFormErrors,
            [name.slice(formPrefix.length)]: "",
          });
        }
      } else if (name.slice(formPrefix.length) === "weight") {
        if (/^\d{0,3}$/.test(value)) {
          setHealthRecordFormValues({
            ...healthRecordFormValues,
            [name.slice(formPrefix.length)]: value,
          });
          setHealthRecordFormErrors({
            ...healthRecordFormErrors,
            [name.slice(formPrefix.length)]: "",
          });
        }
      } else if (name.slice(formPrefix.length) === "bloodPressure") {
        if (/^\d{0,3}(\/\d{0,3})?$/.test(value)) {
          setHealthRecordFormValues({
            ...healthRecordFormValues,
            [name.slice(formPrefix.length)]: value,
          });
          setHealthRecordFormErrors({
            ...healthRecordFormErrors,
            [name.slice(formPrefix.length)]: "",
          });
        }
      } else {
        setHealthRecordFormValues({
          ...healthRecordFormValues,
          [name.slice(formPrefix.length)]: value,
        });
        setHealthRecordFormErrors({
          ...healthRecordFormErrors,
          [name.slice(formPrefix.length)]: "",
        });
      }
    } else if (name.startsWith(profilePrefix)) {
      if (name.slice(profilePrefix.length) === "mobileNumber") {
        const mobileNumberPattern = /^(|[0-9]\d{0,10})$/;
        if (mobileNumberPattern.test(value)) {
          setProfileFormValues({
            ...profileFormValues,
            [name.slice(profilePrefix.length)]: value,
          });
          setProfileFormErrors({
            ...profileFormErrors,
            [name.slice(profilePrefix.length)]: "",
          });
        }
      } else {
        setProfileFormValues({
          ...profileFormValues,
          [name.slice(profilePrefix.length)]: value.toUpperCase(),
        });
        setProfileFormErrors({
          ...profileFormErrors,
          [name.slice(profilePrefix.length)]: "",
        });
      }
    }
    if (globalError) setGlobalError("");
    if (successMessage) setSuccessMessage("");
  };

  const resetHealthRecordAndProfileFormValues = (): void => {
    setHealthRecordFormValues(initialHealthRecordFormValues);
    setProfileFormValues(initalProfileFormValues);
  };

  const resetHealthRecordAndProfileFormErrors = (): void => {
    setHealthRecordFormErrors(initialHealthRecordFormValues);
    setProfileFormErrors(initalProfileFormValues);
  };

  const isHeightValid = (value: string): boolean => {
    let isValid = true;
    const regex = /^\d{2,3}$/;
    if (!regex.test(value)) {
      isValid = false;
    }
    return isValid;
  };

  const isWeightValid = (value: string): boolean => {
    let isValid = true;
    const regex = /^\d{2,3}$/;
    if (!regex.test(value)) {
      isValid = false;
    }
    return isValid;
  };

  const isBloodPressureValid = (value: string): boolean => {
    let isValid = true;
    const regex = /^\d{2,3}\/\d{2,3}$/;
    if (!value || !regex.test(value)) {
      isValid = false;
    }
    return isValid;
  };

  const validation = (): boolean => {
    let isValid = true;
    const newHealthRecordFormErrors: HealthRecordFormValues =
      initialHealthRecordFormValues;
    const newProfileFormErrors: ProfileFormValues = initalProfileFormValues;

    if (!profileFormValues.firstName) {
      newProfileFormErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!profileFormValues.lastName) {
      newProfileFormErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!profileFormValues.dateOfBirth) {
      newProfileFormErrors.dateOfBirth = "Date of birth is required.";
      isValid = false;
    }

    if (!profileFormValues.gender) {
      newProfileFormErrors.gender = "Gender is required.";
      isValid = false;
    }

    if (!profileFormValues.maritalStatus) {
      newProfileFormErrors.maritalStatus = "Civil status is required.";
      isValid = false;
    }

    if (!profileFormValues.address) {
      newProfileFormErrors.address = "Address is required.";
      isValid = false;
    }

    if (!profileFormValues.mobileNumber) {
      newProfileFormErrors.mobileNumber = "Mobile number is required.";
      isValid = false;
    }

    if (
      profileFormValues.mobileNumber &&
      !isMobileNumberValid(profileFormValues.mobileNumber)
    ) {
      newProfileFormErrors.mobileNumber = "Invalid mobile number format";
      isValid = false;
    }

    if (!healthRecordFormValues.profileType) {
      newHealthRecordFormErrors.profileType = "Profile type is required.";
      isValid = false;
    }

    if (!healthRecordFormValues.department) {
      newHealthRecordFormErrors.department = "Department is required.";
      isValid = false;
    }

    if (
      healthRecordFormValues.height &&
      !isHeightValid(healthRecordFormValues.height)
    ) {
      newHealthRecordFormErrors.height = "Invalid height format.";
      isValid = false;
    }

    if (
      healthRecordFormValues.weight &&
      !isWeightValid(healthRecordFormValues.weight)
    ) {
      newHealthRecordFormErrors.weight = "Invalid weight format.";
      isValid = false;
    }

    if (
      healthRecordFormValues.bloodPressure &&
      !isBloodPressureValid(healthRecordFormValues.bloodPressure)
    ) {
      newHealthRecordFormErrors.bloodPressure =
        "Invalid blood pressure format.";
      isValid = false;
    }

    setHealthRecordFormErrors(newHealthRecordFormErrors);
    setProfileFormErrors(newProfileFormErrors);
    return isValid;
  };

  const handleOnSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (validation()) {
      if (healthRecordFormValues.profileType === "OLD") {
        const { lastName, firstName, middleName, suffix, dateOfBirth } =
          profileFormValues;
        const url = `/profiles/profile?lastName=${lastName.trim()}&firstName=${firstName.trim()}&middleName=${middleName.trim()}&suffix=${suffix}&dateOfBirth=${dateOfBirth}`;
        try {
          const response = await get(url);
          if (response.status === 200) {
            const { id } = response.data as Profile;
            // const { lastName, firstName, middleName } = profileFormValues;
            const profileResponse = await put("/profiles/" + id, {
              ...profileFormValues,
              lastName: lastName.trim(),
              firstName: firstName.trim(),
              middleName: middleName.trim(),
              updatedBy: username,
            });
            if (profileResponse.status === 200) {
              await get("/rabbitmq/profiles/send");
              const healthRecordResponse = await post("/records", {
                ...healthRecordFormValues,
                profileId: id,
                createdBy: username,
              });
              if (healthRecordResponse.status === 201) {
                await get("/rabbitmq/records/send");
                setSuccessMessage("Health record created successfully.");
                resetHealthRecordAndProfileFormValues();
                resetHealthRecordAndProfileFormErrors();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setGlobalError(
              "Oops, something went wrong. Please contact your system administrator."
            );
            resetHealthRecordAndProfileFormValues();
            resetHealthRecordAndProfileFormErrors();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          console.error("Error submitting health record data: ", error);
        }
      } else if (healthRecordFormValues.profileType === "NEW") {
        try {
          const { lastName, firstName, middleName } = profileFormValues;
          const profileResponse = await post("/profiles", {
            ...profileFormValues,
            lastName: lastName.trim(),
            firstName: firstName.trim(),
            middleName: middleName.trim(),
            createdBy: username,
          });
          if (profileResponse.status === 201) {
            await get("/rabbitmq/profiles/send");
            const { id } = profileResponse.data as Profile;
            const healthRecordResponse = await post("/records", {
              ...healthRecordFormValues,
              profileId: id,
              createdBy: username,
            });
            if (healthRecordResponse.status === 201) {
              await get("/rabbitmq/records/send");
              setSuccessMessage("Health record created successfully.");
              resetHealthRecordAndProfileFormValues();
              resetHealthRecordAndProfileFormErrors();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setGlobalError(
              "Oops, something went wrong. Please contact your system administrator."
            );
            resetHealthRecordAndProfileFormValues();
            resetHealthRecordAndProfileFormErrors();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          console.error("Error submitting health record data: ", error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {globalError && (
        <div
          role="alert"
          className="alert alert-error rounded-none flex justify-between max-sm:px-2"
        >
          <div className="flex items-center md:gap-x-1.5">
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
      {successMessage && (
        <div
          role="alert"
          className="alert alert-success rounded-none flex justify-between max-sm:px-2"
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
            <span className="text-sm">{successMessage}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 shrink-0 stroke-current cursor-pointer"
            viewBox="0 0 384 512"
            onClick={() => setSuccessMessage("")}
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </div>
      )}
      <form
        className="p-2 lg:p-4 flex flex-col w-11/12 lg:w-10/12 max-sm:w-full"
        onSubmit={handleOnSubmit}
      >
        <div className="flex flex-col self-center w-3/4 lg:w-2/3 md:flex-row items-center max-sm:space-y-4 md:space-x-4">
          <div className="flex-1">
            <div className="flex items-center justify-evenly">
              {profileTypes.map((type, index) => (
                <label key={index} className="label cursor-pointer">
                  <input
                    id="form_profileType"
                    name="form_profileType"
                    type="radio"
                    className="radio mx-2 radio-sm lg:radio-md"
                    value={type.name}
                    checked={healthRecordFormValues.profileType === type.name}
                    onChange={handleOnChange}
                  />
                  <span className="label-text text-sm lg:text-base">
                    {type.name}
                  </span>
                </label>
              ))}
            </div>
            {healthRecordFormErrors.profileType && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {healthRecordFormErrors.profileType}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Purpose of Visit
                </span>
              </div>
              {isLoading ? (
                <div className="flex justify-center">
                  <span className="loading loading-spinner max-sm:loading-xs md:loading-sm lg:loading-md text-primary"></span>
                </div>
              ) : (
                <select
                  name="form_department"
                  id="form_department"
                  className={
                    healthRecordFormErrors.department
                      ? "input input-sm lg:input-md input-bordered input-error rounded-none w-full px-3 text-sm lg:text-base"
                      : "input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
                  }
                  value={healthRecordFormValues.department}
                  onChange={handleOnChange}
                >
                  <option value="">Select department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  ))}
                </select>
              )}
              {healthRecordFormErrors.department && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {healthRecordFormErrors.department}
                  </span>
                </div>
              )}
            </label>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col max-sm:self-center max-sm:space-y-4 md:flex-row md:space-x-4 w-3/4 md:w-full">
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  First Name
                </span>
              </div>
              <input
                id="profile_firstName"
                name="profile_firstName"
                type="text"
                className={
                  profileFormErrors.firstName
                    ? "input input-sm lg:input-md input-bordered input-error rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                    : "input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                }
                value={profileFormValues.firstName}
                onChange={handleOnChange}
              />
              {profileFormErrors.firstName && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.firstName}
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
                id="profile_middleName"
                name="profile_middleName"
                type="text"
                className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                value={profileFormValues.middleName}
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
                  id="profile_lastName"
                  name="profile_lastName"
                  type="text"
                  className={
                    profileFormErrors.lastName
                      ? "input input-sm lg:input-md input-bordered input-error rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                      : "input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                  }
                  value={profileFormValues.lastName}
                  onChange={handleOnChange}
                />
                {profileFormErrors.lastName && (
                  <div className="label">
                    <span className="label-text-alt text-error">
                      {profileFormErrors.lastName}
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
                  id="profile_suffix"
                  name="profile_suffix"
                  className="input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
                  value={profileFormValues.suffix}
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
                id="profile_dateOfBirth"
                name="profile_dateOfBirth"
                type="date"
                className={
                  profileFormErrors.dateOfBirth
                    ? "input input-sm lg:input-md input-bordered input-error rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                    : "input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                }
                value={profileFormValues.dateOfBirth}
                onChange={handleOnChange}
              />
              {profileFormErrors.dateOfBirth && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.dateOfBirth}
                  </span>
                </div>
              )}
            </label>
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">Gender</span>
              </div>
              <select
                id="profile_gender"
                name="profile_gender"
                className={
                  profileFormErrors.gender
                    ? "input input-sm lg:input-md input-bordered input-error rounded-none w-full px-3 text-sm lg:text-base"
                    : "input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
                }
                value={profileFormValues.gender}
                onChange={handleOnChange}
              >
                <option value="">Select gender</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="NON-BINARY">NON-BINARY</option>
                <option value="PREFER NOT TO SAY">PREFER NOT TO SAY</option>
              </select>
              {profileFormErrors.gender && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.gender}
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
                id="profile_maritalStatus"
                name="profile_maritalStatus"
                className={
                  profileFormErrors.maritalStatus
                    ? "input input-sm lg:input-md input-bordered input-error rounded-none w-full px-3 text-sm lg:text-base"
                    : "input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
                }
                value={profileFormValues.maritalStatus}
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
              {profileFormErrors.maritalStatus && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.maritalStatus}
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
                id="profile_address"
                name="profile_address"
                rows={1}
                className={
                  profileFormErrors.address
                    ? "textarea textarea-sm lg:textarea-md textarea-bordered textarea-error rounded-none w-full py-1.5 px-3 text-sm lg:text-base max-sm:min-h-28 max-lg:min-h-0"
                    : "textarea textarea-sm lg:textarea-md textarea-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base max-sm:min-h-28 max-lg:min-h-0"
                }
                value={profileFormValues.address}
                onChange={handleOnChange}
              ></textarea>
              {profileFormErrors.address && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.address}
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
                id="profile_mobileNumber"
                name="profile_mobileNumber"
                type="text"
                className={
                  profileFormErrors.mobileNumber
                    ? "input input-sm lg:input-md input-bordered rounded-none input-error w-full py-1.5 px-3 text-sm lg:text-base"
                    : "input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                }
                value={profileFormValues.mobileNumber}
                onChange={handleOnChange}
              />
              {profileFormErrors.mobileNumber && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.mobileNumber}
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
                id="profile_occupation"
                name="profile_occupation"
                type="text"
                className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                value={profileFormValues.occupation}
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
                id="profile_educationalBackground"
                name="profile_educationalBackground"
                className="input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
                value={profileFormValues.educationalBackground}
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
                id="profile_householdSize"
                name="profile_householdSize"
                type="number"
                min={0}
                className="input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                value={profileFormValues.householdSize ?? 0}
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
                id="profile_incomeBracket"
                name="profile_incomeBracket"
                className="input input-sm lg:input-md input-bordered rounded-none w-full px-3 text-sm lg:text-base"
                value={profileFormValues.incomeBracket}
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
          <hr className="my-4" />
          <div className="flex flex-col max-sm:self-center max-sm:space-y-4 md:flex-row md:space-x-4 w-3/4 md:w-full">
            <label className="form-control flex-1 md:flex-none md:w-40 lg:flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">Height</span>
                <span className="label-text-alt text-gray-600 text-sm xl:text-base">
                  (cm)
                </span>
              </div>
              <input
                id="form_height"
                name="form_height"
                type="text"
                className={
                  healthRecordFormErrors.height
                    ? "input input-sm lg:input-md input-bordered input-error rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                    : "input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                }
                value={healthRecordFormValues.height}
                onChange={handleOnChange}
              />
              {healthRecordFormErrors.height && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {healthRecordFormErrors.height}
                  </span>
                </div>
              )}
            </label>
            <label className="form-control flex-1 md:flex-none md:w-40 lg:flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">Weight</span>
                <span className="label-text-alt text-gray-600 text-sm xl:text-base">
                  (kg)
                </span>
              </div>
              <input
                id="form_weight"
                name="form_weight"
                type="text"
                className={
                  healthRecordFormErrors.weight
                    ? "input input-sm lg:input-md input-bordered input-error rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                    : "input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                }
                value={healthRecordFormValues.weight}
                onChange={handleOnChange}
              />
              {healthRecordFormErrors.weight && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {healthRecordFormErrors.weight}
                  </span>
                </div>
              )}
            </label>
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text text-sm xl:text-base">
                  Blood Pressure (mmHg)
                </span>
                <span className="label-text-alt text-gray-600 text-sm xl:text-base">
                  (e.g. 120/80)
                </span>
              </div>
              <input
                id="form_bloodPressure"
                name="form_bloodPressure"
                type="text"
                className={
                  healthRecordFormErrors.bloodPressure
                    ? "input input-sm lg:input-md input-bordered input-error rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                    : "input input-sm lg:input-md input-bordered rounded-none w-full py-1.5 px-3 text-sm lg:text-base"
                }
                value={healthRecordFormValues.bloodPressure}
                onChange={handleOnChange}
              />
              {healthRecordFormErrors.bloodPressure && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {healthRecordFormErrors.bloodPressure}
                  </span>
                </div>
              )}
            </label>
          </div>
          <div className="flex justify-end self-center w-3/4 my-1.5 md:w-full">
            <input
              type="submit"
              className="btn btn-sm lg:btn-md btn-primary rounded-none text-sm lg:text-base max-sm:w-full"
              value="Submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default HealthRecordForm;
