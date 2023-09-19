import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  getBookmarksById(userId: number, bookmarkId: number) {}

  createBookmark(userId: number, dto: CreateBookmarkDto) {}

  editBookmarkById(userId: number, dto: EditBookmarkDto, bookmarkId: number) {}

  deleteBookmarkById(userId: number, bookmarkId: number) {}
}
