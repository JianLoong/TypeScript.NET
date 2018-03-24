/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/system.systemexception%28v=vs.110%29.aspx
 */

import Exception, {Error} from "./Exception";
export {Error};

export default class SystemException extends Exception
{
	/*
		constructor(
			message:string = null,
			innerException:Error = null,
			beforeSealing?:(ex:any)=>void)
		{
			super(message, innerException, beforeSealing);
		}
	*/

	protected getName():string
	{
		return 'SystemException';
	}
}
