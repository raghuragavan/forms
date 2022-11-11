import { Directive, ElementRef, Input, Renderer2, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: '[appPagination]',
  exportAs: 'pagination'
})
export class PaginationDirective {

  @Input() totalpages: number = 2;
  pageNo: number = 1
  @Output() onChangeEventEmitter = new EventEmitter();

  constructor(private rendered: Renderer2, private e1: ElementRef) { }

  onPrevious() {
    this.setpage(Math.max(1, this.pageNo - 1));
  
  }
  onNext() {
    this.setpage(Math.min(this.totalpages, this.pageNo + 1));
   
  }
  setpage( pageno:number) {
    this.pageNo = pageno;
    this.rendered.setProperty(this.e1.nativeElement, 'value', pageno)
    console.log(this.pageNo)
    this.onChangeEventEmitter.emit(pageno);
  }


} 
