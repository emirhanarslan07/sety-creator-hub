import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StickyCTA } from '@/components/sety/sticky-cta';
describe('Original launch bar scroll behavior',()=>{
 it('stays hidden at 800 pixels and appears only beyond 800 pixels',()=>{
  render(<StickyCTA/>);
  act(()=>{Object.defineProperty(window,'scrollY',{value:800,writable:true});window.dispatchEvent(new Event('scroll'));});
  expect(screen.queryByRole('button')).toBeNull();
  act(()=>{window.scrollY=801;window.dispatchEvent(new Event('scroll'));});
  expect(screen.getByRole('button')).toBeInTheDocument();
 });
});
