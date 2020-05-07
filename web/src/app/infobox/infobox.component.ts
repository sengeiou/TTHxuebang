import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { InfoboxApi } from 'src/providers/infobox.api';
import { AppUtil } from '../app.util';
import { UserbApi } from 'src/providers/userb.api';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss'],
  providers: [InfoboxApi]
})
export class InfoboxComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public infoboxApi: InfoboxApi,
    public userbApi: UserbApi,
  ) {
    super(router, activeRoute, instApi, userbApi);

  }
  checktype = "Inbox";
  summary = {
    unreadcount: 0,
    readcount: 0,
    importantcount: 0,
    sentcount: 0,
    unreadsentcount: 0
  }
  labels = [];
  labelmatch = [];
  checklabels = [];

  nowcondition = { receivetype: "B" };
  pageno = 0;
  mailist = [];

  pagenum = 30;

  keyword = "";
  inread = null;
  isend = false;
  onMyLoad() {
    this.params;
    this.infoboxApi.labels({}).then((list: [any]) => {
      for (var i = 0; i < list.length; i++) {
        list[i].checked = false;
        this.labelmatch["a_" + list[i].id] = list[i];
        //this.checklabels.push(list[i].id);
      }
      this.labels = list;
      this.loadlist(this.nowcondition, this.pageno);
    })
    if (this.params.msgid != undefined) {
      this.infoboxApi.detail({ id: this.params.msgid, setread: "Y" }).then((info: any) => {
        this.inread = info;
        this.inread.content = AppUtil.HtmlDecode(info.content);
        this.loadSummary();
      })
    }
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("infobox", "infobox");
    }
    this.loadSummary();
  }
  checkLabel(item) {
    if (item.checked == false) {
      item.checked = true;
    } else {
      item.checked = false;
    }
    var klabel = [];
    for (var i = 0; i < this.labels.length; i++) {
      if (this.labels[i].checked) {
        klabel.push(this.labels[i].id);
      }
    }
    this.checklabels = klabel;
    this.loadlist(this.nowcondition, 0);
  }

  loadSummary() {
    this.infoboxApi.summary({ receivetype: "B" }).then((summary: any) => {
      this.summary = summary;
    })
  }

  loadlist(cond, pageno) {
    this.inread = null;
    this.nowcondition = cond;
    this.pageno = pageno;
    this.infoboxApi.list(cond).then((list: [{ labels: "" }]) => {
      console.log(list.length);
      var newlist = [];
      if (this.checklabels.length > 0 || this.keyword.trim() != '') {
        console.log("inchecklabels");
        for (var item of list) {
          var bkeyword = false;
          if (this.keyword.trim() == ''
            || JSON.stringify(item).indexOf(this.keyword) > -1) {
            console.log("?");
            bkeyword = true;
          }
          var blabel = false;
          if (this.checklabels.length > 0) {
            var labels = item.labels.split(",");
            for (var v of labels) {
              for (var checkitem of this.checklabels) {
                //console.log("check", v, checkitem, v == checkitem, item.id);
                if (v == checkitem) {
                  blabel = true;
                  break;
                }
              }
            }
          } else {
            blabel = true;
          }
          //console.log("check2", bkeyword, blabel, bkeyword && blabel, item.id);
          if (bkeyword && blabel) {
            newlist.push(item);
          }
        }
        this.mailist = newlist;
      } else {
        this.mailist = list;
      }
      //console.log(this.mailist[0]);
      console.log("check2",this.mailist.length);
    });
  }

  nextpage() {
    if ((this.pageno + 1) * 30 <= this.mailist.length) {
      this.pageno++;
    }
  }
  prevpage() {
    if (this.pageno > 0) {
      this.pageno--;
    }
  }
  setImportant(item) {
    item.important_value = item.important_value == 'Y' ? "N" : "Y";
    this.infoboxApi.setimportant({ id: item.id, val: item.important_value }).then(() => {
      this.loadSummary();
    });
  }
  setInRead(item) {
    this.inread = item;
    this.infoboxApi.detail({ id: item.id, setread: this.isend == false ? "Y" : "" }).then((info: any) => {
      this.inread.content = AppUtil.HtmlDecode(info.content);
      this.loadSummary();
    })
  }
  todetail(){
    var opurl=this.inread.opurl;
    window.location.href=opurl;
  }
}
