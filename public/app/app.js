import "./utils/array-helpers.js";
import { notasService } from "./nota/service.js";
import {
  debounceTime,
  partialize,
  takeUntil,
  pipe,
} from "./utils/operators.js";

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const action = operations(() =>
  notasService.sumItems("2143").then(console.log).catch(console.log)
);

document.querySelector("#myButton").onclick = action;
