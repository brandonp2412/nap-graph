import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Nap } from './nap.model';
import { NapService } from './nap.service';

@Injectable()
export class NapPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private napService: NapService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.napService.find(id)
                    .subscribe((napResponse: HttpResponse<Nap>) => {
                        const nap: Nap = napResponse.body;
                        if (nap.date) {
                            nap.date = {
                                year: nap.date.getFullYear(),
                                month: nap.date.getMonth() + 1,
                                day: nap.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.napModalRef(component, nap);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.napModalRef(component, new Nap());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    napModalRef(component: Component, nap: Nap): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.nap = nap;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
