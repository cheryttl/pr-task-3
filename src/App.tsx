import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NumberWidgetProps {
  initialValue: number;
}

const colorClass = (n: number) => {
  if (n < 0) return 'bg-red-500 hover:bg-red-600';
  if (n < 50) return 'bg-gray-500 hover:bg-gray-600';
  if (n < 100) return 'bg-neutral-900 hover:bg-neutral-800 text-white';
  return 'bg-amber-400 hover:bg-amber-500';
};

const transformValue = (num: number) => `Результат: ${(num * 2.5 + 10).toFixed(2)}`;

const NumberWidget: React.FC<NumberWidgetProps> = ({ initialValue }) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // сохраняем прежнее поведение: Number('') -> 0
    const parsed = Number(e.target.value);
    setValue(Number.isNaN(parsed) ? 0 : parsed);
  };

  return (
    <section className="w-full max-w-xl p-6 bg-white/60 dark:bg-slate-900/60 rounded-2xl shadow-lg ring-1 ring-slate-900/5 backdrop-blur">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Виджет: {initialValue}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Поле принимает число, результат вычисляется автоматически.</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-amber-800 bg-amber-100">Начальное: {initialValue}</span>
      </header>

      <div className="mt-4">
        <Textarea
          id={`value-${initialValue}`}
          value={String(value)}
          onChange={handleChange}
          placeholder="Введите число"
          className={cn('h-28 resize-none rounded-md border border-slate-200 dark:border-slate-700', 'px-3 py-2')}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <Button className={cn('px-4 py-2 rounded-md text-sm font-medium text-white transition-shadow shadow-sm', colorClass(value))}>
          Текущее значение: {value}
        </Button>

        <div className="text-right">
          <div className="text-sm text-slate-500 dark:text-slate-400">Результат преобразования</div>
          <div className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">{transformValue(value)}</div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-amber-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col gap-6 items-center">
      <div className="w-full max-w-3xl space-y-4">
        <NumberWidget initialValue={1} />
        <NumberWidget initialValue={100} />
        <NumberWidget initialValue={123} />
        <NumberWidget initialValue={444} />
      </div>
    </main>
  );
}
