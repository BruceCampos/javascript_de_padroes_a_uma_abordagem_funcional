import "./utils/array-helpers.js";
import { delay, timeoutPromisse, retry } from "./utils/promise-helpers.js";
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
  retry(3, 3000, () => timeoutPromisse(200, notasService.sumItems("2143")))
    .then(delay(5000))
    .then(console.log)
    .catch(console.log)
);

document.querySelector("#myButton").onclick = action;
