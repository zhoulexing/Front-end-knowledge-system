import test from 'tape';

import { incrementAsync } from './saga'

test('incrementAsync Saga test', (assert) => {
    const gen = incrementAsync();
    assert.deepEqual(
        gen.next().value,
        { done: false, value: ??? },
        'incrementAsync should return a Promise that will resolve after 1 second'
    )
});