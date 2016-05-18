import R from 'ramda';
import { isArray, map } from 'lodash';
import { renameKeys } from './ramda-ext';

export default (state, transformer) => {
  const transform = (data, transformation) => {
    const { pick, extract, rename } = transformation;

    if (extract) {
      data = extract(data);
    }

    if (pick) {
      data = R.pick(pick, data);
    }

    if (rename) {
      data = renameKeys(rename)(data);
    }

    delete transformation.pick;
    delete transformation.extract;
    delete transformation.rename;

    return R.evolve(transformation, data);
  };

  const transformation = transformer(R);

  if (!transformation) {
    return state;
  }

  const { extract } = transformation;
  let { wrapWith } = transformation;

  delete transformation.wrapWith;

  if (isArray(state) && !extract) {
    wrapWith = wrapWith || 'values';

    const result = {};
    const values = map(state, (val) => (transform(val, transformation)));

    result[wrapWith] = values;

    return result;
  }

  return transform(state, transformation);
};
