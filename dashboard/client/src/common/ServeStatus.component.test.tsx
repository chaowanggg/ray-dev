import { render, screen } from "@testing-library/react";
import React from "react";
import { ServeApplication, ServeApplicationStatus } from "../type/serve";
import { ServeStatusIcon } from "./ServeStatus";

const APP: ServeApplication = {
  name: "MyServeApp",
  route_prefix: "/my-serve-app",
  docs_path: null,
  status: ServeApplicationStatus.RUNNING,
  message: "",
  last_deployed_time_s: 1682029771.0748637,
  deployed_app_config: null,
  deployments: {},
};

describe("ServeStatusIcon", () => {
  it("renders RUNNING status", () => {
    render(<ServeStatusIcon app={APP} small={false} />);
    const icon = screen.getByTestId("serve-status-icon");
    const classList = icon.getAttribute("class");
    expect(classList).toContain("colorSuccess");
  });

  it("renders NOT_STARTED status", () => {
    render(
      <ServeStatusIcon
        app={{ ...APP, status: ServeApplicationStatus.NOT_STARTED }}
        small={false}
      />,
    );
    expect(screen.queryByTestId("serve-status-icon")).not.toHaveClass(
      "colorSuccess",
    );
    expect(screen.queryByTestId("serve-status-icon")).not.toHaveClass(
      "colorError",
    );
  });

  it("renders DEPLOY_FAILED status", () => {
    render(
      <ServeStatusIcon
        app={{ ...APP, status: ServeApplicationStatus.DEPLOY_FAILED }}
        small={false}
      />,
    );
    const icon = screen.getByTestId("serve-status-icon");
    const classList = icon.getAttribute("class");
    expect(classList).toContain("colorError");
  });

  it("renders DEPLOYING and DELETING status", () => {
    render(
      <ServeStatusIcon
        app={{ ...APP, status: ServeApplicationStatus.DEPLOYING }}
        small={false}
      />,
    );
    expect(screen.queryByTestId("serve-status-icon")).toBeNull();

    render(
      <ServeStatusIcon
        app={{ ...APP, status: ServeApplicationStatus.DELETING }}
        small={false}
      />,
    );
    expect(screen.queryByTestId("serve-status-icon")).toBeNull();
  });
});
