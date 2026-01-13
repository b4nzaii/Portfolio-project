declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export = classes;
}

declare module "react-helmet";
