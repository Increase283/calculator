export interface ApiResponse {
  success: boolean;
  error: boolean;
  numpods: number;
  datatypes: string;
  timedout: string;
  timedoutpods: string;
  timing: number;
  parsetiming: number;
  parsetimedout: boolean;
  recalculate: string;
  id: string;
  host: string;
  server: string;
  related: string;
  version: string;
  inputstring: string;
  pods: Pod[];
}

interface Pod {
  title: string;
  scanner: string;
  id: string;
  position: number;
  error: boolean;
  numsubpods: number;
  primary: boolean;
  subpods: Subpod[];
  expressiontypes: ExpressionType;
  states?: State[]; // Делаем необязательным, так как может быть не у всех подов
}

interface Subpod {
  title: string;
  img: Image;
  plaintext: string;
}

interface Image {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  type: string;
  themes: string;
  colorinvertable: boolean;
  contenttype: string;
}

interface ExpressionType {
  name: string;
}

interface State {
  name: string;
  input: string;
  stepbystep: boolean;
  buttonstyle: string;
}
