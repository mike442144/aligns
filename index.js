
'use strict';

const R = require('ramda');

// mapSeparator :: a -> ([b] -> [a])
const mapSeparator = (s) => R.map (()=>s);

// paddingLen :: Integer -> [Integer]
const paddingLen = (len) => len < 0 ? R.range(0, 0) : R.range(0, len);

// paddingWith :: a -> (Integer -> [a])
const paddingWith = (s) => R.compose(mapSeparator(s),  paddingLen);

// _leftpad :: String -> Integer -> String -> String
const _leftpad = R.curry(
	(s, l, str) => R.join('')(R.concat ( paddingWith(s)(l-str.length) , R.split('', str)))
);

// _rightpad :: String -> Integer -> String -> String
const _rightpad = R.curry(
	(s, l, str) => R.join('')(R.concat(R.split('', str), paddingWith(s)(l-str.length) ))
);

// _centerpad :: String -> Integer -> String -> String
const _centerpad = R.curry(
	(s, l, r, str) => _rightpad(s, r)(_leftpad(s, l, str))
);

// longest :: [a] -> Integer
const longest = R.compose(R.reduce(R.max, 0), R.map(R.length));

const _leftpadw = _leftpad(' ');
const _rightpadw = _rightpad(' ');
const _centerpadw = _centerpad(' ');

// alignRight :: Integer -> [String] -> [String]
const alignRight = R.curry(
	(indent, strs) => {
		const totalLen = R.compose(R.add(indent), longest);
		return R.map(_leftpadw(totalLen(strs)) , strs);
	}
);

// alignLeft :: Integer -> [String] -> [String]
const alignLeft = R.curry(
	(indent, strs) => {
		const totalLen = R.compose(R.add(indent), longest);
		return R.map(_rightpadw(totalLen(strs)) , strs);
	}
);

// half :: Integer -> Integer
const half = R.multiply(0.5);

// alignCenter :: Integer -> [String] -> [String]
const alignCenter = R.curry(
	(indent, strs) => {
		const totalLen = R.compose(R.add(indent), longest);
		const halfLen = R.compose(half, totalLen);
		const leftLen = R.compose(Math.floor, R.add(halfLen(strs)), half, R.length);

		return R.map(str => _centerpadw(leftLen(str),totalLen(strs),  str), strs);
	}
);

// alignTable :: [[String]] -> [[String]]
const alignTableL = R.compose(R.transpose, R.map(alignLeft(0)), R.transpose);
const alignTableR = R.compose(R.transpose, R.map(alignRight(0)), R.transpose);
const alignTable = R.compose(R.transpose, R.map(alignCenter(0)), R.transpose);

module.exports = {
	alignRight,
	alignLeft,
	alignCenter,
	alignTableL,
	alignTableR,
	alignTable
};
