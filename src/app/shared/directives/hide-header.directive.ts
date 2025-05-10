import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective implements OnInit {
  private lastScrollTop = 0;
  private headerHeight = 0; // Store the header's height

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    // Get the header's height and store it
    this.headerHeight = this.el.nativeElement.offsetHeight;
    this.renderer.setStyle(
      this.el.nativeElement,
      'top',
      `-${this.headerHeight}px`,
    ); // Initially hide
    console.log(this.headerHeight);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    console.log('scrollTop', scrollTop);
    console.log('lastScrollTop', this.lastScrollTop);

    if (scrollTop > this.lastScrollTop) {
      // Scrolling down
      console.log('1');
      this.renderer.setStyle(
        this.el.nativeElement,
        'top',
        `-${this.headerHeight}px`,
      );
      // this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    } else {
      // Scrolling up
      console.log('2');
      this.renderer.setStyle(this.el.nativeElement, 'top', '0px');
      // this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
