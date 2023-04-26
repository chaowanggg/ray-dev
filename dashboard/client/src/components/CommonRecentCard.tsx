import { createStyles, makeStyles, Typography } from "@material-ui/core";
import classNames from "classnames";
import _ from "lodash";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  LinkWithArrow,
  OverviewCard,
} from "../pages/overview/cards/OverviewCard";

type CommonRecentCardProps = {
  headerTitle: string;
  className: string | undefined;
  items: RecentListItem[];
  itemEmptyTip: string;
  footerText: string;
  footerLink: string;
};

type RecentListItem = {
  title: string | null;
  subtitle: string;
  link: string | undefined;
  icon: ReactNode;
  className: string | undefined;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2, 3),
    },
    listContainer: {
      marginTop: theme.spacing(2),
      flex: 1,
      overflow: "hidden",
    },
    listItem: {
      "&:not(:first-child)": {
        marginTop: theme.spacing(1),
      },
    },
  }),
);

export const CommonRecentCard = ({
  className,
  headerTitle,
  items,
  itemEmptyTip,
  footerText,
  footerLink,
}: CommonRecentCardProps) => {
  const classes = useStyles();

  return (
    <OverviewCard className={classNames(classes.root, className)}>
      <Typography variant="h3">{headerTitle}</Typography>
      <div className={classes.listContainer}>
        {items.map((item) => (
          <ListItem
            key={item.title}
            icon={item.icon}
            link={item.link}
            className={classes.listItem}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
        {items.length === 0 && (
          <Typography variant="h4">{itemEmptyTip}</Typography>
        )}
      </div>
      <LinkWithArrow text={footerText} to={footerLink} />
    </OverviewCard>
  );
};

const useRecentJobListItemStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "center",
      textDecoration: "none",
    },

    textContainer: {
      flex: "1 1 auto",
      width: `calc(100% - ${theme.spacing(1) + 20}px)`,
    },
    title: {
      color: "#036DCF",
    },
    entrypoint: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "#5F6469",
    },
  }),
);

const ListItem = ({
  icon,
  title,
  subtitle,
  className,
  link,
}: RecentListItem) => {
  const classes = useRecentJobListItemStyles();

  const cardContent = (
    <React.Fragment>
      {icon}
      <div className={classes.textContainer}>
        <Typography className={classes.title} variant="body2">
          {title}
        </Typography>
        <Typography
          className={classes.entrypoint}
          title={subtitle}
          variant="caption"
        >
          {subtitle}
        </Typography>
      </div>
    </React.Fragment>
  );
  return (
    <div className={className}>
      {link !== undefined ? (
        <Link className={classes.root} to={link}>
          {cardContent}
        </Link>
      ) : (
        <div className={classes.root}>{cardContent}</div>
      )}
    </div>
  );
};
