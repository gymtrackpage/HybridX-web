
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Clock, Route, RefreshCw, Ruler } from 'lucide-react';

type CalculateOption = 'pace' | 'time' | 'distance';
type UnitOption = 'km' | 'miles';

export default function PaceCalculatorForm() {
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [paceMinutes, setPaceMinutes] = useState('');
  const [paceSeconds, setPaceSeconds] = useState('');
  
  const [unit, setUnit] = useState<UnitOption>('km');
  const [calculateFor, setCalculateFor] = useState<CalculateOption>('pace');
  
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setResult(null);
    setError(null);
  }, [distance, hours, minutes, seconds, paceMinutes, paceSeconds, unit, calculateFor]);

  const formatTime = (totalSeconds: number): string => {
    if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00:00";
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatPace = (secondsPerUnit: number): string => {
    if (isNaN(secondsPerUnit) || secondsPerUnit < 0) return "00:00";
    const m = Math.floor(secondsPerUnit / 60);
    const s = Math.floor(secondsPerUnit % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} per ${unit}`;
  };

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const distNum = parseFloat(distance);
    const hoursNum = parseInt(hours, 10) || 0;
    const minutesNum = parseInt(minutes, 10) || 0;
    const secondsNum = parseFloat(seconds) || 0;
    const paceMinutesNum = parseInt(paceMinutes, 10) || 0;
    const paceSecondsNum = parseFloat(paceSeconds) || 0;

    if (calculateFor === 'pace') {
      if (isNaN(distNum) || distNum <= 0) {
        setError('Please enter a valid distance.');
        return;
      }
      const totalTimeSec = hoursNum * 3600 + minutesNum * 60 + secondsNum;
      if (totalTimeSec <= 0) {
        setError('Please enter a valid time.');
        return;
      }
      const paceSecPerUnit = totalTimeSec / distNum;
      setResult(`Calculated Pace: ${formatPace(paceSecPerUnit)}`);
    } else if (calculateFor === 'time') {
      if (isNaN(distNum) || distNum <= 0) {
        setError('Please enter a valid distance.');
        return;
      }
      const totalPaceSec = paceMinutesNum * 60 + paceSecondsNum;
      if (totalPaceSec <= 0) {
        setError('Please enter a valid pace.');
        return;
      }
      const totalTimeSec = totalPaceSec * distNum;
      setResult(`Calculated Time: ${formatTime(totalTimeSec)}`);
    } else if (calculateFor === 'distance') {
      const totalTimeSec = hoursNum * 3600 + minutesNum * 60 + secondsNum;
      if (totalTimeSec <= 0) {
        setError('Please enter a valid time.');
        return;
      }
      const totalPaceSec = paceMinutesNum * 60 + paceSecondsNum;
      if (totalPaceSec <= 0) {
        setError('Please enter a valid pace.');
        return;
      }
      const calculatedDist = totalTimeSec / totalPaceSec;
      setResult(`Calculated Distance: ${calculatedDist.toFixed(2)} ${unit}`);
    }
  };

  const handleClear = () => {
    setDistance('');
    setHours('');
    setMinutes('');
    setSeconds('');
    setPaceMinutes('');
    setPaceSeconds('');
    setResult(null);
    setError(null);
    // setCalculateFor('pace'); // Optionally reset this too
    // setUnit('km'); // Optionally reset this too
  };
  
  const inputBaseClass = "bg-background/70 border-border/70 focus:border-primary";

  return (
    <form onSubmit={handleCalculate} className="space-y-6 md:space-y-8 font-body">
      <div>
        <Label htmlFor="calculateFor" className="text-base font-medium text-primary">Calculate For:</Label>
        <RadioGroup
          id="calculateFor"
          value={calculateFor}
          onValueChange={(value) => setCalculateFor(value as CalculateOption)}
          className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4"
        >
          {[
            { value: 'pace', label: 'Pace', icon: <Route className="mr-2 h-5 w-5" /> },
            { value: 'time', label: 'Time', icon: <Clock className="mr-2 h-5 w-5" /> },
            { value: 'distance', label: 'Distance', icon: <Ruler className="mr-2 h-5 w-5" /> },
          ].map(opt => (
             <Label 
                key={opt.value}
                htmlFor={`calc-${opt.value}`}
                className={`flex items-center justify-center space-x-2 p-3 rounded-md border cursor-pointer transition-colors
                            ${calculateFor === opt.value ? 'bg-accent text-accent-foreground border-accent ring-2 ring-accent ring-offset-2 ring-offset-background' : 'bg-background hover:bg-muted/50 border-border'}`}
              >
                <RadioGroupItem value={opt.value} id={`calc-${opt.value}`} className="sr-only" />
                {opt.icon}
                <span>{opt.label}</span>
              </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <Label htmlFor="distance" className="text-sm font-medium">Distance</Label>
          <Input
            id="distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="e.g., 10"
            disabled={calculateFor === 'distance'}
            className={`${inputBaseClass} mt-1`}
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <Label htmlFor="unit" className="text-sm font-medium">Unit</Label>
          <Select value={unit} onValueChange={(value) => setUnit(value as UnitOption)}>
            <SelectTrigger id="unit" className={`${inputBaseClass} mt-1`}>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="km">Kilometers (km)</SelectItem>
              <SelectItem value="miles">Miles (mi)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Time (HH:MM:SS)</Label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <Input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="HH"
            disabled={calculateFor === 'time'}
            className={inputBaseClass}
            min="0"
          />
          <Input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="MM"
            disabled={calculateFor === 'time'}
            className={inputBaseClass}
            min="0" max="59"
          />
          <Input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            placeholder="SS"
            disabled={calculateFor === 'time'}
            className={inputBaseClass}
            min="0" max="59.99" step="0.01"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Pace (MM:SS per {unit})</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <Input
            type="number"
            value={paceMinutes}
            onChange={(e) => setPaceMinutes(e.target.value)}
            placeholder="MM"
            disabled={calculateFor === 'pace'}
            className={inputBaseClass}
            min="0"
          />
          <Input
            type="number"
            value={paceSeconds}
            onChange={(e) => setPaceSeconds(e.target.value)}
            placeholder="SS"
            disabled={calculateFor === 'pace'}
            className={inputBaseClass}
            min="0" max="59.99" step="0.01"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button type="submit" className="w-full sm:w-auto flex-grow bg-primary hover:bg-primary/90 text-primary-foreground text-base py-3">
          <Calculator className="mr-2 h-5 w-5" /> Calculate
        </Button>
        <Button type="button" variant="outline" onClick={handleClear} className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 text-base py-3">
          <RefreshCw className="mr-2 h-5 w-5" /> Clear
        </Button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive rounded-lg text-center">
          <p className="font-medium text-destructive">{error}</p>
        </div>
      )}
      {result && (
        <div className="mt-6 p-6 bg-primary/10 border border-primary/30 rounded-lg text-center shadow-md">
          <p className="text-xl md:text-2xl font-semibold text-primary">{result}</p>
        </div>
      )}
    </form>
  );
}
