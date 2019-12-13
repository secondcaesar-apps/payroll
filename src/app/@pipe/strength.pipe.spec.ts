import { StrengthPipe } from './strength.pipe';
import { pipe } from 'rxjs';

describe('StrengthPipe', () => {
 let  pipe:StrengthPipe;

beforeEach(()=>{

   pipe = new StrengthPipe();

})

it('Should be weak ',() =>{
   expect(pipe.transform(5)).toEqual('5 (weak)')
})


});
