import { createStyles, makeStyles } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { ServeStatusIcon } from "../../../common/ServeStatus";
import { ListItemCard } from "../../../components/ListItemCard";
import { useServeApplications } from "../../serve/hook/useServeApplications";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(1),
    },
  }),
);

type RecentServeCardProps = {
  className?: string;
};

/*
{
    "": {
        "name": "",
        "route_prefix": "/test",
        "docs_path": null,
        "status": "RUNNING",
        "message": "",
        "last_deployed_time_s": 1682029771.0748637,
        "deployed_app_config": null,
        "deployments": {
            "MyModelDeployment": {
                "name": "MyModelDeployment",
                "status": "HEALTHY",
                "message": "",
                "deployment_config": {
                    "name": "MyModelDeployment",
                    "num_replicas": 1,
                    "max_concurrent_queries": 100,
                    "user_config": null,
                    "autoscaling_config": null,
                    "graceful_shutdown_wait_loop_s": 2,
                    "graceful_shutdown_timeout_s": 20,
                    "health_check_period_s": 10,
                    "health_check_timeout_s": 30,
                    "ray_actor_options": {
                        "runtime_env": {},
                        "num_cpus": 1
                    },
                    "is_driver_deployment": false
                },
                "replicas": [
                    {
                        "replica_id": "MyModelDeployment#oJRaQg",
                        "state": "RUNNING",
                        "pid": 364224,
                        "actor_name": "SERVE_REPLICA::MyModelDeployment#oJRaQg",
                        "actor_id": "b8c9082697cd69c16109eeb804000000",
                        "node_id": "3434841e491012452165c643fea4919d80d078554059d3e008d51713",
                        "node_ip": "172.31.5.171",
                        "start_time_s": 1682029903.403788
                    }
                ]
            }
        }
    }
}

*/

export const RecentServeCard = ({ className }: RecentServeCardProps) => {
  const classes = useStyles();

  const { allServeApplications: applications } = useServeApplications();

  const sortedApplications = _.orderBy(
    applications,
    ["last_deployed_time_s"],
    ["desc"],
  ).slice(0, 6);

  const sortedApplicationsToRender = sortedApplications.map((app) => {
    return {
      title: app.name,
      subtitle: app.route_prefix,
      link: app.name ? `/serve/applications/${app.name}` : undefined,
      className: className,
      icon: <ServeStatusIcon className={classes.icon} app={app} small />,
    };
  });

  return (
    <ListItemCard
      headerTitle="Recent Applications"
      className={className}
      items={sortedApplicationsToRender}
      emptyListText="No Applications yet..."
      footerText="View all applications"
      footerLink="/serve"
    />
  );
};
