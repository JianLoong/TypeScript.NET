﻿/*
 * @author electricessence / https://github.com/electricessence/
 * Originally based upon .NET source but with many additions and improvements.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

///<reference path="ITimeMeasurement.d.ts"/>
///<reference path="../IEquatable.d.ts"/>
///<reference path="../IComparable.d.ts"/>
import {areEqual,compare} from '../Compare';
import Type from '../Types';
import * as HowMany from './HowMany';
import TimeUnit from './TimeUnit';
import TimeUnitValue from './TimeUnitValue';
import ClockTime from './ClockTime';
import TimeQuantity from './TimeQuantity';

/**
 * TimeSpan expands on TimeQuantity to provide an class that is similar to .NET's TimeSpan including many useful static methods.
 */
export default
class TimeSpan extends TimeQuantity implements ITimeMeasurement
{

	ticks: number;
	milliseconds: number;
	seconds: number;
	minutes: number;
	hours: number;
	days: number;

	// In .NET the default type is Ticks, but for JavaScript, we will use Milliseconds.
	constructor(value:number, units:TimeUnit = TimeUnit.Milliseconds)
	{
		var ms = TimeUnit.toMilliseconds(value, units);
		super(ms);

		var _ = this;
		_.ticks = ms*HowMany.Ticks.Per.Millisecond;
		_.milliseconds = ms;
		_.seconds = ms/HowMany.Milliseconds.Per.Second;
		_.minutes = ms/HowMany.Milliseconds.Per.Minute;
		_.hours = ms/HowMany.Milliseconds.Per.Hour;
		_.days = ms/HowMany.Milliseconds.Per.Day;
	}

	/**
	 * Provides an standard interface for acquiring the total time.
	 * @returns {TimeSpan}
	 */
	get total():TimeSpan
	{
		return this;
	}

	private _time:ClockTime;
	// Instead of the confusing getTotal versus unit name, expose a 'ClockTime' value which reports the individual components.
	get time():ClockTime
	{
		var _ = this, t = _._time;
		if(!t) _._time = t = new ClockTime(_.getTotalMilliseconds());
		return t;
	}

	add(other:ITimeQuantity):TimeSpan
	{
		if(Type.isNumber(other))
			throw new Error(
				"Use .addUnit(value:number,units:TimeUnit) to add a numerical value amount.  Default units are milliseconds.\n" +
				".add only supports quantifiable time values (ITimeTotal)."
			);

		return new TimeSpan(this.getTotalMilliseconds() + other.total.milliseconds);
	}

	addUnit(value:number, units:TimeUnit = TimeUnit.Milliseconds):TimeSpan
	{
		return new TimeSpan(this.getTotalMilliseconds() + TimeUnit.toMilliseconds(value, units));
	}


	static from(value:number, units:TimeUnit)
	{
		return new TimeSpan(value, units);
	}

	static fromDays(value:number):TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Days);
	}

	static fromHours(value:number):TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Hours);
	}

	static fromMinutes(value:number):TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Minutes);
	}

	static fromSeconds(value:number):TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Seconds);
	}

	static fromMilliseconds(value:number):TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Milliseconds);
	}

	static fromTicks(value:number):TimeSpan
	{
		return new TimeSpan(value, TimeUnit.Ticks);
	}


	static get zero():TimeSpan
	{
		return timeSpanZero || (timeSpanZero = new TimeSpan(0));
	}
}


var timeSpanZero:TimeSpan;
