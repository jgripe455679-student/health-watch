import argparse
import json
import pandas as pd

def convert_json_to_csv(input_file: str, output_file: str) -> None:
    with open(input_file, "r") as file:
        data = json.load(file)

    rows = []

    for result in data.get("Results", []):
        target = result.get("Target")
        result_class = result.get("Class")
        result_type = result.get("Type")

        for vulnerability in result.get("Vulnerabilities", []):
            rows.append({
                "Target": target,
                "Class": result_class,
                "Type": result_type,
                "Vulnerability ID": vulnerability.get("VulnerabilityID"),
                "Package": vulnerability.get("PkgName"),
                "Installed Version": vulnerability.get("InstalledVersion"),
                "Fixed Version": vulnerability.get("FixedVersion"),
                "Severity": vulnerability.get("Severity"),
                "Status": vulnerability.get("Status")
            })

    df = pd.DataFrame(rows)
    print(df.to_string(index=False))
    df.to_csv(output_file, index=False)

def main():
    parser = argparse.ArgumentParser(
        description="Convert Trivy JSON vulnerability report to CSV."
    )

    parser.add_argument(
        "input_file",
        help="Path to the input JSON file"
    )

    parser.add_argument(
        "output_file",
        help="Path where the CSV file will be saved"
    )

    args = parser.parse_args()

    convert_json_to_csv(args.input_file, args.output_file)

if __name__ == "__main__":
    main()