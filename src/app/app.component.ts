import { Component, computed, effect, SettableSignal, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Senegal: Signal</h1>
    <section>
      <h2>Multiply By: {{multiplyBy()}}</h2>
      <a href="#" (click)="nextLine()" role="button">Next Line</a>
      <a style="margin: 0 5px 0 5px " href="#" (click)="nextTable()" role="button">Next table</a>
      <a href="#" (click)="reset()" role="button">Reset</a>
    </section>
    <section>
    <article>
      <pre>{{tableDisplay()}}</pre>
    </article>
    </section>
  `,
})
export class AppComponent {
  title = 'train-multi';

  multiplyBy: SettableSignal<number> = signal(2);
  count: SettableSignal<number> = signal(1);
  table: SettableSignal<string[]> = signal([this.getLine()]);
  tableDisplay: Signal<string> = computed(() => this.table().join('\n'));

  nextLine() {
    this.count.update((c) => c + 1)
    this.table.update((t) => [...t, this.getLine()])
  }

  nextTable() {
    this.multiplyBy.update((m) => m + 1)
    this.reset()
  }

  reset() {
    this.count.set(1)
    this.table.set([this.getLine()])
    effect(() => this.multiplyBy())
  }

  private getLine(): string {
    const product = this.count() * this.multiplyBy()
    const ok = `${this.count()} * ${this.multiplyBy()} = ${product}`
    console.log('ok ==>', ok);
    return ok
  }
}
