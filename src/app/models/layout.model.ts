export class ColumnSetting {
  primaryKey: string="";
  header?: string="";
  format?: string="";
  alternativeKeys?: string[]=[];
  action?:Function;
  routerParams?:boolean=false;
  currency?:boolean=false;
}
