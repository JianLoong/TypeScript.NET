/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

import ObjectDisposedException from "./ObjectDisposedException";
import IDisposableAware, {IDisposable} from "./IDisposableAware";
import {Closure} from "../FunctionTypes";
export {IDisposable}

abstract class DisposableBase implements IDisposableAware
{

	constructor(
		protected readonly _disposableObjectName:string,
		private readonly __finalizer?:Closure|null)
	{
	}

	private __wasDisposed:boolean = false;

	get wasDisposed():boolean
	{
		return this.__wasDisposed;
	}

	protected throwIfDisposed(
		message?:string,
		objectName:string|null = this._disposableObjectName):true|never
	{
		if(this.__wasDisposed)
			throw new ObjectDisposedException(objectName, message);
		return true;
	}


	dispose():void
	{
		const _ = this;
		if(!_.__wasDisposed)
		{
			// Preemptively set wasDisposed in order to prevent repeated disposing.
			// NOTE: in true multi-threaded scenarios, this needs to be synchronized.
			_.__wasDisposed = true;
			try
			{
				_._onDispose(); // Protected override.
			}
			finally
			{
				if(_.__finalizer) // Private finalizer...
				{
					_.__finalizer();
					(<any>_).__finalizer = void 0;
				}
			}
		}
	}

	// Placeholder for overrides.
	protected _onDispose():void { }

}

export default DisposableBase;