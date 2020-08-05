import { Word } from './../../../shared/models/word';
import { Letter } from './../../../shared/models/letter';
import { LetterService } from './../../../shared/services/letter.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CommentReply } from './../../../shared/models/comment-reply';
import { Comment } from './../../../shared/models/comment';
import { CommentService } from './../../../shared/services/comment.service';
import { Component, OnInit, ViewChild } from '@angular/core';

interface TableLetter {
  _id: string;
  letterId: number;
  name: string;
  wordsAmount: number;
  commentsAmount: number;
  repliesAmount: number;
  notApprovedCommentsAmount: number;
  notApprovedRepliesAmount: number;
}

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss'],
})
export class AdminCommentsComponent implements OnInit {
  isLoading = true;
  letters: Letter[] = [];
  tableLetters: TableLetter[] = [];

  displayedColumns: string[] = [
    'name',
    'wordsAmount',
    'commentsAmount',
    'repliesAmount',
    'notApprovedCommentsAmount',
    'notApprovedRepliesAmount',
    'actions',
  ];

  dataSource: MatTableDataSource<TableLetter>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private commentService: CommentService,
    private letterService: LetterService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    try {
      this.letters = await this.letterService.getAll();

      this.letters.forEach((letter) => {
        const wordsAmountTemp = letter.words.length;
        const commentsAmountTemp = letter.comments.length;

        const repliesAmountTemp = letter.comments.reduce(
          (accumulator, comment) => {
            return accumulator + comment.replies.length;
          },
          0
        );

        const notApprovedCommentsAmountTemp = letter.comments.reduce(
          (accumulator, comment) => {
            if (!comment.isApproved) return accumulator + 1;
            else return accumulator;
          },
          0
        );

        const notApprovedRepliesAmountTemp = letter.comments.reduce(
          (accumulator, comment) => {
            const replies = comment.replies.reduce((counter, reply) => {
              if (!reply.isApproved) return counter + 1;
              else return counter;
            }, 0);

            return accumulator + replies;
          },
          0
        );

        const tableLetter: TableLetter = {
          _id: letter._id,
          letterId: letter.letterId,
          name: letter.name,
          wordsAmount: wordsAmountTemp,
          commentsAmount: commentsAmountTemp,
          repliesAmount: repliesAmountTemp,
          notApprovedCommentsAmount: notApprovedCommentsAmountTemp,
          notApprovedRepliesAmount: notApprovedRepliesAmountTemp,
        };
        this.tableLetters.push(tableLetter);
      });

      this.dataSource = new MatTableDataSource(this.tableLetters);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }

  async approveLetterContent(letterId) {
    try {
      const result = await this.letterService.approveAll(letterId);

      const index = this.tableLetters.findIndex((l) => l._id === result._id);
      if (index !== -1) {
        this.tableLetters[index].notApprovedCommentsAmount = 0;
        this.tableLetters[index].notApprovedRepliesAmount = 0;
        this.dataSource = new MatTableDataSource(this.tableLetters);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

      this.toastr.success('All content has been approved successfully');
    } catch (err) {
      this.toastr.error(err.error);
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
