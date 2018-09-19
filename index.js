
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

// alignRight :: String -> Integer -> [String] -> [String]
const alignRightWith = R.curry(
	(s, indent, strs) => {
		const totalLen = R.compose(R.add(indent), longest);
		return R.map(_leftpad(s, totalLen(strs)) , strs);
	}
);

// alignLeft :: String -> Integer -> [String] -> [String]
const alignLeftWith = R.curry(
	(s, indent, strs) => {
		const totalLen = R.compose(R.add(indent), longest);
		return R.map(_rightpad(s, totalLen(strs)) , strs);
	}
);

// alignRight :: Integer -> [String] -> [String]
const alignRight = alignRightWith(' ');

// alignLeft :: Integer -> [String] -> [String]
const alignLeft = alignLeftWith(' ');

// half :: Integer -> Integer
const half = R.multiply(0.5);

// alignCenterWith :: String -> Integer -> [String] -> [String]
const alignCenterWith = R.curry(
	(s, indent, strs) => {
		const totalLen = R.compose(R.add(indent), longest);
		const halfLen = R.compose(half, totalLen);
		const leftLen = R.compose(Math.floor, R.add(halfLen(strs)), half, R.length);

		return R.map(str => _centerpad(s, leftLen(str),totalLen(strs),  str), strs);
	}
);

// alignCenter :: Integer -> [String] -> [String]
const alignCenter = alignCenterWith(' ');

// alignTable :: [[String]] -> [[String]]
const alignTableL = R.compose(R.transpose, R.map(alignLeft(0)), R.transpose);
const alignTableR = R.compose(R.transpose, R.map(alignRight(0)), R.transpose);
const alignTable = R.compose(R.transpose, R.map(alignCenter(0)), R.transpose);

module.exports = {
	right: alignRight,
	rightWith: alignRightWith,
	left: alignLeft,
	leftWith: alignLeftWith,
	center: alignCenter,
	centerWith: alignCenterWith,
	tableL: alignTableL,
	tableR: alignTableR,
	table: alignTable
};
