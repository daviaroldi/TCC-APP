import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfessorHomePage } from '../pages/professorHome/professorHome';
import { StudentHomePage } from '../pages/studentHome/studentHome';
import { SessionStudentPage } from '../pages/studentHome/session/session';
import { SessionConnectPage } from '../pages/studentHome/session/modal/session.connect';
import { SessionPage } from '../pages/professorHome/session/session';
import { SessionCreatePage } from '../pages/professorHome/session/modal/session.create';
import { SessionDetailPage } from '../pages/professorHome/session/modal/session.detail';
import { QuestionListPage } from '../pages/professorHome/session/modal/question/question.list';
import { QuestionCreatePage } from '../pages/professorHome/session/modal/question/question.create';
import { AnswerPage } from '../pages/professorHome/answer/answer';
import { AnswerListPage } from '../pages/professorHome/answer/list/answer.list';
import { AnswerShowPage } from '../pages/professorHome/answer/list/answer.show';
import { BaseService } from '../services/base.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ProfessorHomePage,
    SessionPage,
    SessionCreatePage,
    SessionDetailPage,
    QuestionListPage,
    QuestionCreatePage,
    StudentHomePage,
    SessionStudentPage,
    SessionConnectPage,
    AnswerPage,
    AnswerListPage,
    AnswerShowPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    ProfessorHomePage,
    SessionPage,
    SessionCreatePage,
    SessionDetailPage,
    QuestionListPage,
    QuestionCreatePage,
    StudentHomePage,
    SessionStudentPage,
    SessionConnectPage,
    AnswerPage,
    AnswerListPage,
    AnswerShowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
