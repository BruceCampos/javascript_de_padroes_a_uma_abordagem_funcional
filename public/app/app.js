import "./utils/array-helpers.js";
import { timeoutPromisse, retry } from "./utils/promise-helpers.js";
import { notasService } from "./nota/service.js";
import {
  debounceTime,
  partialize,
  takeUntil,
  pipe,
} from "./utils/operators.js";
import { EventEmitter } from "./utils/event-emitter.js";

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const action = operations(() =>
  retry(3, 3000, () => timeoutPromisse(200, notasService.sumItems("2143")))
    .then((total) => EventEmitter.emit("itensTotalizados", total))
    .catch(console.log)
);

document.querySelector("#myButton").onclick = action;

EventEmitter.on("itensTotalizados", console.log);
EventEmitter.on("itensTotalizados", (total) =>
  alert(`Total de itens: ${total}`)
);
