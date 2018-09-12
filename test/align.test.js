
'use strict';

const expect = require('chai').expect;
const rewire = require('rewire');
const align = rewire('../');

describe('align', () => {
	describe('mapSeparator', () => {
		const separator = '=';
		it('should return a function :: [b] -> [a]', () => {
			const mapSeparator = align.__get__('mapSeparator');
			const rt = mapSeparator(separator);
			
			expect(rt).to.be.an('function');
		});
	});
	
	describe('paddingWith', () => {
		const separator = '=';
		it('padding with separator of length', () => {
			const paddingWith = align.__get__('paddingWith');
			const len = 10;
			const rt = paddingWith(separator);
			
			expect(rt(len).length).to.eql(len);
		});
	});
	
	describe('_leftpad', () => {
		const leftpad = align.__get__('_leftpad');
		const str = 'abcdefg';
		const separator = '=';
		it('should padding at first', () => {
			const len = 10;
			const rt = leftpad(separator, len, str);
			
			expect(rt.length).to.eql(len<str.length?str.length:len);
			expect(rt.slice(0,3)).to.eql('===');
			
		});

		it('should not padding if long enough', () => {
			const len = 6;
			const rt = leftpad(separator, len, str);
			expect(rt.length).to.eql(str.length);
		});
	});

	describe('longest', () => {
		const longest = align.__get__('longest');
		
		it('should get max value', () => {
			const rt = longest(['abc', 'bbc', 'fuck']);
			
			expect(rt).to.eql(4);
		});

		it('should get 0 if empty', () => {
			const rt = longest([]);
			
			expect(rt).to.eql(0);
		});
	});

	describe('alignRight', () => {
		it('should align to right', () => {
			const str = 'hijklmkjjfkdlsj';
			const indent = 4;
			const strs = ['abc', 'abcdefg', str];
			const aligned = align.alignRight(indent, strs);
			
			expect(aligned.length).to.eql(3);
			expect(aligned[0].length).to.eql(str.length+indent);
			expect(aligned.every(s=>s.length===aligned[0].length)).to.be.true;
			expect(aligned.every((s, i) => s.slice(0, str.length + indent - strs[i].length).split('').every(s=>s===' ') )).to.be.true;
		});
	});

	describe('_rightpad', () => {
		const rightpad = align.__get__('_rightpad');
		const str = 'abcdefg';
		const separator = '-';
		it('should padding at last', () => {
			const len = 10;
			const rt = rightpad(separator, len, str);
			
			expect(rt.length).to.eql(len<str.length?str.length:len);
			expect(rt.slice(str.length,rt.length)).to.eql('---');
		});

		it('should not padding if long enough', () => {
			const len = 5;
			const rt = rightpad(separator, len, str);
			
			expect(rt.length).to.eql(len<str.length?str.length:len);
		});
	});

	describe('alignLeft', () => {
		it('should align left', () => {
			const str = 'hijklmkjjfkdlsj';
			const indent = 4;
			const strs = ['abc', 'abcdefg', str];
			const aligned = align.alignLeft(indent, strs);
			
			expect(aligned.length).to.eql(3);
			expect(aligned[0].length).to.eql(str.length+indent);
			expect(aligned.every(s=>s.length===aligned[0].length)).to.be.true;
			expect(aligned.every((s, i) => s.slice(strs[i].length, s.length).split('').every(s=>s===' ') )).to.be.true;
		});
	});

	describe('_centerpad', () => {
		const centerpad = align.__get__('_centerpad');
		const str = 'abcdefg';
		const separator = '-';
		
		it('should padding both before and after string', () => {
			const l = 8;
			const r = 10;
			const rt = centerpad(separator, l, r,  str);
			
			expect(rt.length).to.eql(10);
			expect(rt.slice(0, 1)).to.eql('-');
			expect(rt.slice(8, 10)).to.eql('--');
		});

		it('should not padding if long enough', () => {
			const l = 7;
			const r = 7;
			const rt = centerpad(separator, l, r, str);
			
			expect(rt.length).to.eql(str.length);			
		});
	});
	
	describe('alignCenter', () => {
		it('should align center', () => {
			const str = 'hijklmkjjfkdlsj';
			const indent = 4;
			const strs = ['abc', 'abcdefg', str];
			const aligned = align.alignCenter(indent, strs);
			
			expect(aligned.length).to.eql(3);
			expect(aligned[0].length).to.eql(str.length+indent);
			expect(aligned.every(s=>s.length===aligned[0].length)).to.be.true;
		});
	});

	describe('alignTableL', () => {
		const strss = [['John Smith','100'],['Mark','9090'],['Ora','9900']];
		
		it('should align left', () => {
			const aligned = align.alignTableL(strss);

			expect(aligned.length).to.eql(3);
			expect(aligned[0][0].length).to.eql(strss[0][0].length);
			expect(aligned[1][0].slice(4,10).split('').every(s=>s===' ')).to.be.true;
			expect(aligned.every(s=>s[1].length===aligned[0][1].length)).to.be.true;
		});
	});

	describe('alignTableR', () => {
		const strss = [['John Smith','100'],['Mark','9090'],['Ora','9900']];
		
		it('should align right', () => {
			const aligned = align.alignTableR(strss);
			
			expect(aligned.length).to.eql(3);
			expect(aligned[0][0].length).to.eql(strss[0][0].length);
			expect(aligned[1][0].slice(0,6).split('').every(s=>s===' ')).to.be.true;
			expect(aligned.every(s=>s[1].length===aligned[0][1].length)).to.be.true;
		});
	});

	describe('alignTable', () => {
		const strss = [['John Smith','100'],['Mark','9090'],['Ora','9900']];
		
		it('should align center', () => {
			const aligned = align.alignTable(strss);
			
			expect(aligned.length).to.eql(3);
			expect(aligned[0][0].length).to.eql(strss[0][0].length);
			expect(aligned[1][0].slice(0,3).split('').every(s=>s===' ')).to.be.true;
			expect(aligned[1][0].slice(7,10).split('').every(s=>s===' ')).to.be.true;
			expect(aligned.every(s=>s[1].length===aligned[0][1].length)).to.be.true;
		});
	});
});
